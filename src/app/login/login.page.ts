import { Component, OnInit } from '@angular/core';
import { DataCollectorService } from '../data-collector.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UtilsService } from '../utils.service';
import * as firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public onLoginForm: FormGroup;
  uid: string = '';
  validation_messages = {
    'email': [
      { type: 'required', message: '*Email is required.' },
      { type: 'pattern', message: '*Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: '*Password is required.' },
    ]
  };

  constructor(
    public service: DataCollectorService,
    public navCtrl: NavController,
    public _fb: FormBuilder,
    public utils: UtilsService, public fb:Facebook,
    public api:ApiService) { 
      if (localStorage.getItem('userLoggedIn') == 'true') {
        this.navCtrl.navigateRoot(['/tabs']);
      }
    }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
      ])],
      password: ['', Validators.compose([
        Validators.required,
      ])]
    });
  }

  loginAccount(data) {
    var self = this;
    self.utils.presentLoading();
    firebase.auth().signInWithEmailAndPassword(data.email, data.password).then((user) => {

      if (user) {
        self.uid = user.user.uid;
        var registerData={
          account:data.email
        }
        this.api.postRequest('/register',registerData).then((res)=>{
          self.getUserData();
        })
        
      }
    }).catch((e) => {
      debugger;
      self.utils.stopLoading();
      self.utils.createToast(e.message);
    });
  }

  getUserData() {
    var self = this;
    firebase.database().ref().child('users/' + self.uid)
      .once('value', (snapshot) => {
        var user = snapshot.val();
        if (user) {
        if ( !user.isBlock) {
          self.utils.stopLoading();
          if (localStorage.getItem("deviceToken")) {
            var token: string = localStorage.getItem("deviceToken");
            var tokens: Array<any> = user.deviceTokens || [];
  
            if (tokens.indexOf(token) < 0) {
              tokens.push(token);
              firebase.database().ref().child(`users/${user.uid}/deviceTokens`).set(tokens);
            }
          }
          localStorage.setItem('fullName', user.fullName);
          localStorage.setItem('profileUrl', user.profileUrl || '');
          localStorage.setItem('email', user.email);
          localStorage.setItem('userLoggedIn', 'true');
          localStorage.setItem('uid', user.uid);
          self.navCtrl.navigateRoot(['/tabs']);
          this.service.publishSomeData({
            user: user
          })
          
        }
        else{
          self.utils.createToast("You are blocked by Admin.For any query please Contact Admin!!");
          self.utils.stopLoading();
        }
      }

      }).catch((e) => {
        self.utils.stopLoading();
        self.utils.createToast(e.message);
      });
  }


  async callCallBackFunction() {
    this.utils.presentLoading()
    this.fb.login(['email'])
      .then((response: FacebookLoginResponse) => {
        debugger;
        this.onLoginSuccess(response);
        console.log(response.authResponse.accessToken);
      }).catch((error) => {
        this.utils.stopLoading();
        console.log(JSON.stringify(error))
        alert('error:' + JSON.stringify(error))
      });
  }
  onLoginSuccess(res: FacebookLoginResponse) {
    const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    firebase.auth().signInAndRetrieveDataWithCredential(credential)
      .then((response) => {
        var isNewUser = response.additionalUserInfo.isNewUser;
        if (isNewUser) {
          this.saveUserToFirebase(response.additionalUserInfo.profile, response.user.uid)

        } else {
          this.uid = response.user.uid;
          localStorage.setItem("uid", response.user.uid);
          this.getUserData();

        }
      })

  }

  saveUserToFirebase(user, uid) {
    var updates = {}
    var data = {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email || '',
      uid: uid,
      profileUrl: user.picture.data.url || '',
      timestamp: Number(new Date())
    }
    updates['/users/' + uid] = data;
    firebase.database().ref().update(updates).then(() => {
      localStorage.setItem('email', data.email);
      localStorage.setItem('fullName', data.firstName + " " + data.lastName);
      localStorage.setItem('uid', uid);
      localStorage.setItem('userLoggedIn', 'true');
      this.navCtrl.navigateRoot(['/tabs']);
      localStorage.setItem('showSkillPage','true');
      this.utils.stopLoading();
    })

  }
}
