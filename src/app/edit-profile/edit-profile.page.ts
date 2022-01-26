import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataCollectorService } from '../data-collector.service';
import { UtilsService } from '../utils.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  
  public maxYear: any;
  public userObj: any = {};
  public imagePath: any;
  public newFile: any;

  constructor(
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    public router: Router,
    public dataCollector: DataCollectorService,
    public utils: UtilsService) {
  }

  ngOnInit() {
    var currentYear = (new Date()).getFullYear();
    this.maxYear = currentYear - 18;
  }

  ionViewWillEnter() {
    this.userObj = this.dataCollector.userObj;
    if (this.userObj) {
    } else {
      var self = this;
      firebase.database().ref().child('users/' + localStorage.getItem('uid'))
        .once('value', (snapshot) => {
          var user = snapshot.val();
          if (user) {
            self.userObj = user;
            self.dataCollector.userObj = self.userObj;
          }
        }).catch((e) => {
          self.utils.createToast(e.message);
        });
    }
  }

  async pictureClick() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an option',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            console.log('Camera clicked');
            this.openCamera(1);
          }
        }, {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            console.log('Gallery clicked');
            this.openCamera(2);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  updateProfile() {
    if (this.checkEmptyFields()) {
      this.utils.createToast("Please fill out the blank fields!");
      return;
    }
    
    if (this.newFile) {
      this.saveImage();
    }
    else {
      this.updateData();
    }
  }

  checkEmptyFields() {
    if (!this.userObj.fullName ||
      !this.userObj.dob || !this.userObj.country || !this.userObj.city ||
      !this.userObj.phone || !this.userObj.gender || !this.userObj.bio) {
      return true;
    } 
    else {
      return false;
    }
  }

  saveImage() {
    var self = this;
    self.utils.presentLoading();
    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = storageRef.child(`profileImages/${filename}.jpg`);

    imageRef.putString(self.imagePath, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
      firebase.storage().ref('profileImages/' + snapshot.metadata.name).getDownloadURL().then((url) => {
        self.userObj.profileUrl = url;
        self.updateData();
      });
    });
  }

  updateData() {
    var self = this;
    var uid = localStorage.getItem('uid');
    var updates = {};
    updates['/users/' + uid] = self.userObj;
    firebase.database().ref().update(updates)
      .then(() => {
        self.utils.stopLoading();
        localStorage.setItem('profileUrl', self.userObj.profileUrl);
        localStorage.setItem('fullName', self.userObj.fullName);
        self.utils.createToast('Profile Updated Successfully');
      }).catch((e) => {
        self.utils.stopLoading();
        self.utils.createToast(e.message);
      });
  }

  openCamera(src) {
    var self = this;
    const options: CameraOptions = {
      quality: 100,
      destinationType: self.camera.DestinationType.DATA_URL,
      encodingType: self.camera.EncodingType.JPEG,
      mediaType: self.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: src,
      allowEdit: true
    }

    self.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      self.imagePath = base64Image;
      self.newFile = true;
    }, (err) => {
      alert(err);
    });
  }

  

 

}
