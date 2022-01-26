import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilsService } from '../utils.service';
import * as firebase from 'firebase';
import { DataCollectorService } from '../data-collector.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public onRegisterForm: FormGroup;
  public uid: any;
  

  constructor(
    public alertController: AlertController,
    public _fb: FormBuilder,
    public router: Router,
    public utils: UtilsService,
    public navCtrl: NavController, public service:DataCollectorService) {
      
  }

  ngOnInit() {
    this.onRegisterForm = this._fb.group({
      fullName: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
      ])],
      password: ['', Validators.compose([
        Validators.required,
      ])],
      cPassword: ['', Validators.compose([
        Validators.required
      ])],
      phone: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  createAccount(data) {
    var self = this;
    if (data.password != data.cPassword) {
      self.utils.createToast("Passwords Mismatch!");
    }
    else {
      self.utils.presentLoading("Creating Account");
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then((user) => {
        var userAuth=firebase.auth().currentUser;
        userAuth.sendEmailVerification();
        if (firebase.auth().currentUser) {
          self.uid = firebase.auth().currentUser.uid;
        }
        self.saveDatatoUserTableAfterRegister(data);
      })
        .catch((error) => {
          self.utils.stopLoading();
          alert(error.message);
        });
    }
  }

  saveDatatoUserTableAfterRegister(data) {
    var self = this;
    var deviceTokens;
    if (localStorage.getItem("deviceToken")) {
      var token: string = localStorage.getItem("deviceToken");
      var tokens: Array<any> = [];
      tokens.push(token);
      deviceTokens = tokens;
    }
    data.password = null;
    data.cPassword = null;
    data.uid = self.uid;
    data.deviceTokens = deviceTokens || "";
    data.timestamp = Number(new Date());
    var updates = {};
    updates['/users/' + self.uid] = data;
    firebase.database().ref().update(updates).then(() => {
      self.utils.stopLoading();
      this.service.publishSomeData({
        user: data
      })
      this.navCtrl.navigateForward(['/login']);
      })
    }
    
  
}
