import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DataCollectorService } from '../data-collector.service';
import * as firebase from 'firebase';
import { IonContent, NavController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UtilsService } from '../utils.service';
import { ImageViewerPage } from '../image-viewer/image-viewer.page';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.page.html',
  styleUrls: ['./chat-screen.page.scss'],
})
export class ChatScreenPage implements OnInit {

  @ViewChild(IonContent, { read: IonContent, static: false }) content: IonContent;
  public uid: any;
  public otherUid: any;
  public newMessage = {
    senderId: "",
    message: "",
    timestamp: Number(new Date()),
    recipientId: "",
    image: "",
    status: "",
    key:""
  }
  public chatKey: any;
  public chatRef: any;
  public chats: Array<any> = [];
  isBlocked:any=false;
  from:any=false;

  constructor(public route: ActivatedRoute,
    public service: DataCollectorService, public zone: NgZone, public camera: Camera, public alertCtrl: AlertController,
    public utils: UtilsService, public router: Router,
    public modalController: ModalController,
    public alertController: AlertController) {

    this.uid = localStorage.getItem('uid');
    this.route.params.subscribe((params) => {
      this.otherUid = params['id'];
      if (this.uid < this.otherUid) {
        this.chatKey = this.uid + "-" + this.otherUid;
      } else {
        this.chatKey = this.otherUid + "-" + this.uid;
      }
      debugger;
      this.newMessage.senderId = this.uid;
      this.newMessage.recipientId = this.otherUid;
      this.newMessage.status = this.otherUid;
      this.getChats();
      this.service.getUser(this.otherUid);
      this.service.getUser(this.uid);
      this.checkBlockUser();
    })
  }

  ngOnInit() {
  }

  toSelect(chat){
    debugger;
    if(chat.senderId != this.uid){
    if(chat.selected){
      chat.selected=false;
    }
    else{
      chat.selected=true;
    }
  }
  }

  checkBlockUser(){
    if(this.service.usersData[this.uid].blocks){
      if(this.service.usersData[this.uid].blocks.includes(this.otherUid)){
        this.isBlocked=true;
        this.from=true;
      }
    }
    else if(this.service.usersData[this.otherUid].blocks){
      if(this.service.usersData[this.otherUid].blocks.includes(this.uid)){
        this.isBlocked=true;
        this.from=false;
      }
    }
  }

  getChats() {
    this.chatRef = firebase.database().ref().child(`chats/${this.chatKey}/messages`);

    this.chatRef.on("child_added", (snapshot) => {
      this.zone.run(() => {
        this.chats.push(snapshot.val());
        this.scrollToBottom();
      });
    });
  }

  async presentAlertConfirm() {
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure you want to block this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {

            var updates = {};
            var blocks = [];
            if (!this.service.usersData[this.uid].blocks) {
              blocks.push(this.otherUid);
              updates['users/' + this.uid + '/blocks'] = blocks;
              firebase.database().ref().update(updates).then(()=>{
              this.utils.createToast('Blocked successfully!');
              this.isBlocked=true;
              this.from=true;
              })
            }
            else {
              blocks = this.service.usersData[this.uid].blocks;
              blocks.push(this.otherUid);
              updates['users/' + this.uid + '/blocks'] = blocks;
              firebase.database().ref().update(updates).then(()=>{
              this.utils.createToast('Blocked successfully!');
              this.isBlocked=true;
              this.from=true;
              })
            }
          }
        }
      ]
    });

    await alert.present();
  }


  async toUblockPromot(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure you want to Unblock this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {

            var updates = {};
            if (this.service.usersData[this.uid].blocks) {
              var blocks=this.service.usersData[this.uid].blocks;
              var a = blocks.indexOf(this.otherUid);
              blocks.splice(a,1);
              updates['users/' + this.uid + '/blocks'] = blocks;
              firebase.database().ref().update(updates).then(()=>{
                this.checkBlockUser();
              this.utils.createToast('Unblocked successfully!');
             
              })
            }
          }
        }
      ]
    });

    await alert.present();

  }

  onFocus() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  sendMessage(image?) {
    debugger;
    console.log(this.newMessage);

    if (!this.newMessage.message.trim() && !image) {
      return;
    }

    this.newMessage.image = image || "";

    this.newMessage.timestamp = Number(new Date());

    var key = firebase.database().ref().child(`chats/${this.chatKey}/messages`).push().key;

    var updates = {};
    this.newMessage.key=key;

    updates[`/chats/${this.chatKey}/messages/${key}`] = this.newMessage;

    firebase.database().ref().update(updates).then(() => {
      this.getDeviceToken(this.newMessage.recipientId, this.newMessage.message);
      this.newMessage.message = "";
      this.newMessage.image = "";
    });
  }

  async viewImage(img) {
    const modal = await this.modalController.create({
      component: ImageViewerPage,
      componentProps: {
        image: img
      }
    });
    await modal.present();
  }

  getDeviceToken(uid, message) {
    var self = this;

    firebase.database().ref().child('users/' + uid + "/deviceTokens")
      .once('value', (snapshot) => {
        var deviceToken = snapshot.val();
        debugger;
        var data = {
          chat: 'chat',
          chatKey: this.chatKey
        }
        var title = localStorage.getItem('fullName');
        self.service.saveNotificationToFirebase(uid, localStorage.getItem('uid'), message, title, data);
        if (deviceToken) {
          self.service.sendNewNotification(title, message, deviceToken, data);
        } else {
          self.utils.stopLoading();
        }
      });
  }

  async chooseImage() {
    const alert = await this.alertCtrl.create({
      header: 'Upload Picture',
      message: 'Select an option to upload picture',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.openCamera(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Gallery',
          handler: () => {
            this.openCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
      ]
    });
    await alert.present();
  }


  openCamera(source) {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: source,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.utils.presentLoading("Sending image...");
      let storageRef = firebase.storage().ref();
      const filename = Math.floor(Date.now() / 1000);
      const imageRef = storageRef.child(`chatImages/${filename}.jpg`);
      imageRef.putString(base64Image, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          this.sendMessage(url);
          this.utils.stopLoading();
        });
      });

    }, (err) => {
      alert(err.message);
      console.log(err);
    });
  }
  toOtherProfile() {
    this.router.navigate(['others-profile/' + this.otherUid])
  }


  addToFavorite() {
    this.service.getUser(this.uid);
    this.service.getUser(this.otherUid);
    var favorites = [];
    debugger;
    if (this.service.usersData[this.uid].favorites) {
      favorites = this.service.usersData[this.uid].favorites;
    }
    favorites.push(this.otherUid);
    var updates = {};
    updates['users/' + this.uid + '/favorites'] = favorites;
    firebase.database().ref().update(updates).then(() => {
      this.utils.createToast("Added to Favorite!");
    })
  }

  removeFromFavorite() {

    this.service.getUser(this.uid);
    this.service.getUser(this.otherUid);
    var favorites = [];

    if (this.service.usersData[this.uid].favorites) {
      favorites = this.service.usersData[this.uid].favorites;
    }
    debugger;
    const findex = favorites.indexOf(this.otherUid);
    if (findex > -1) {
      favorites.splice(findex, 1);
    }
    debugger;
    var updates = {};
    updates['users/' + this.uid + '/favorites'] = favorites;
    firebase.database().ref().update(updates).then(() => {
      this.utils.createToast("Remove From Favorite!");
    })
  }

  toLike(chat){
    var updates={};
    debugger;
    updates['chats/'+this.chatKey+'/messages/'+chat.key+'/liked/']=true;
    firebase.database().ref().update(updates).then(()=>{
      chat.liked=true;
      chat.selected=false;
    })
  }

  toDislike(chat){
    var updates={};
    debugger;
    updates['chats/'+this.chatKey+'/messages/'+chat.key+'/liked/']=false;
    firebase.database().ref().update(updates).then(()=>{
      chat.liked=false;
      chat.selected=false;
    })
  }


}
