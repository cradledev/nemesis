import { Component, OnInit } from '@angular/core';

import { Platform, NavController,ModalController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SelectContactPage } from './select-contact/select-contact.page';
import { ConfirmContactPage } from './confirm-contact/confirm-contact.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as firebase from 'firebase';
import { DataCollectorService } from './data-collector.service';
declare var FirebasePlugin: any;
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  pickedContacts: Array<any> = [];
  allInvites: Array<any> = [];
  public selectedIndex = 0;
  public user:any={};
  public appPages = [
    {
      title: 'Home',
      url: '/tabs/tab1',
      icon: './assets/imgs/home.png'
    },
    {
      title: 'Hot Or Not',
      url: '/tabs/tab5',
      icon: './assets/imgs/hot.png'
    },
    {
      title: 'Invite',
      url: '/tabs/tab1',
      icon: './assets/imgs/invite.png'
    },
    {
      title: 'About Us',
      url: '/about-us',
      icon: './assets/imgs/about-us.png'
    },
    {
      title: 'Debate',
      url: '/debate-feature',
      img:'mic-outline'
    },
    {
      title:'Sugessted',
      url:'/suggested-users',
      img:'person-outline'
    },
    {
      title: 'Promotion',
      url: '/promotion',
      img:'pricetags-outline'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: './assets/imgs/settings.png'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: './assets/imgs/logout.png'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public socialSharing: SocialSharing,
    public modalController: ModalController,
    public service:DataCollectorService,
    public toastCtrl:ToastController,
    public localNotifications:LocalNotifications
  ) {

    this.service.getObservable().subscribe((data) => {
      if (data.user) {
        this.user = data.user;
      }
    })

    this.user.fullName = localStorage.getItem('fullName');
    this.user.email = localStorage.getItem('email');
    this.user.profileUrl = localStorage.getItem('profileUrl');
    if (this.user.profileUrl == "undefined") {
      this.user.profileUrl = "";
    }
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#e03a3c');
      this.notificationsMethods();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

  }

  toSelect(i){
    if(i==2){
      this.selectContacts();
      this.selectedIndex=i;
    }
    if(i==8){
     this.logoutUser();
    }
    else{
      this.selectedIndex=i;
    }
  }


  toProfile() {
    this.navCtrl.navigateRoot(['/profile']);
  }

  async selectContacts() {
    const modal = await this.modalController.create({
      component: SelectContactPage,
      componentProps: {
        pickedContacts: this.pickedContacts
      }
    });
    await modal.present();
    var data = (await modal.onWillDismiss()).data.selectedContacts;
    if (data) {
      this.pickedContacts = data;
      this.openModal();
    }
  }


  async openModal() {
    const modal = await this.modalController.create({
      component: ConfirmContactPage,
      componentProps: {
        pickedContacts: this.pickedContacts
      }
    });
    await modal.present();
    var data = (await modal.onWillDismiss()).data.selectedContacts;
    if (data) {
      var phoneNumbers: string;
      data.forEach(x => {
        if (phoneNumbers) {
          phoneNumbers = phoneNumbers + ', ' + x.phone;
        } else {
          phoneNumbers = x.phone;
        }
      });
      this.pickedContacts = data;
      this.shareInvite(phoneNumbers);
    }
  }


  shareInvite(phoneNumbers: string) {
    var name = 'Roheel Mustafa';
    var httpLink = 'http://www.google.com'

    var inviteText = 'You have received a request from ' + name + ' to join a Nemesis Vs app ' +
        '. \n\nInstall the app to follow my photos, videos and songs' +
      ' \n\nGet it for free at ' + httpLink;

    this.socialSharing.shareViaSMS(inviteText, phoneNumbers)
      .then(() => {
       // this.saveInvitesOnFirebase(this.pickedContacts[0], 0);
      }).catch((err) => {
       alert(err);
      });
  }

  


  notificationsMethods() {
    if (this.platform.is("cordova")) {
      debugger;

      FirebasePlugin.grantPermission(function (hasPermission) {
        console.log("Permission was " + (hasPermission ? "granted" : "denied"));
      });

      FirebasePlugin.hasPermission(function (hasPermission) {
        console.log("Permission is " + (hasPermission ? "granted" : "denied"));
      });

      FirebasePlugin.getToken((token) => {
        // save this server-side and use it to push notifications to this device
        console.log(token);
        /*  alert(token); */
        debugger;
        if (localStorage.getItem("deviceToken") !== token) {
          localStorage.setItem("deviceToken", token);
          if (localStorage.getItem("uid")) {
            this.setUserToken(token);
          }
        }
      }, function (error) {
        console.error(error);
        /* alert("Error getting Token!!!!"); */
      });


      FirebasePlugin.onTokenRefresh((token) => {
        // save this server-side and use it to push notifications to this device
        console.log(token);
        console.log(localStorage.getItem("deviceToken"));
        debugger;
        if (localStorage.getItem("deviceToken") !== token) {
          localStorage.setItem("deviceToken", token);
          if (localStorage.getItem("uid")) {
            this.setUserToken(token);
          }
        }
      }, function (error) {
        console.error(error);
      });


      FirebasePlugin.onMessageReceived((message) => {
        console.log("Message type: " + message.messageType);
        console.log(message.tap);
        console.log(message);
        if (localStorage.getItem("notificationsCount")) {
          var notiCount = Number(localStorage.getItem("notificationsCount"));
          notiCount = notiCount + 1;
          localStorage.setItem("notificationsCount", String(notiCount));
        } else {
          var notiCount = 1;
          localStorage.setItem("notificationsCount", String(notiCount));
        }
            this.localNotifications.schedule({
              id: 1,
              title: message.title,
              text: message.body,
              foreground: true,
              smallIcon: '/assets/imgs/appLogo11.png',
            });
        if (message.chat) {
          if (message.tap == 'background') {
            this.getChatData(message.chatKey);
          }
          else {
            this.showToastMsg();
          }
        }
       

      })

    }
  }

  async showToastMsg() {
    const toast = await this.toastCtrl.create({
      message: 'You have received a new Message!',
      position: 'top',
      duration: 2000,
    });
    toast.present();
  }


  getChatData(key) {
    var chatKey = key;
    var parts = chatKey.split("-");
    var recentChats:any={};
    var uid:any;
    if (parts[0] == localStorage.getItem('uid') || parts[1] == localStorage.getItem('uid')) {
      if (localStorage.getItem('uid') == parts[0]) {
        uid = parts[1];
      } else if (localStorage.getItem('uid') == parts[1]) {
        uid = parts[0];
      }
    }
    firebase.database().ref().child('users/'+uid)
    .once('value',(snapshot)=>{
     var user=snapshot.val();
     this.navCtrl.navigateForward(['/chat-screen/'+user.uid]);
    })
  }


  


  setUserToken(token) {
    var uid = localStorage.getItem("uid");
    firebase.database().ref().child(`users/${uid}/deviceTokens`)
      .once("value")
      .then(snapshot => {
        var tokens: Array<any> = snapshot.val() || [];

        if (tokens.indexOf(token) < 0) {
          tokens.push(token);
          firebase.database().ref().child(`users/${uid}/deviceTokens`).set(tokens);
        }
      })
      .catch(err => {
        console.log(err.message);
      })
  }


  


  logoutUser() {
    var self = this;
    self.removeCurrentTokenFromUser();
    var token = localStorage.getItem('deviceToken');
    localStorage.clear();
    localStorage.setItem('deviceToken', token);
    var user = firebase.auth().currentUser;
    if (user != null) {
      firebase.auth().signOut().then(() => {
        localStorage.setItem("userLoggedIn", "false");
        self.navCtrl.navigateRoot(['/login']);
      })
        .catch((e) => {
          alert(e.message);
        })
    } else {
      self.navCtrl.navigateRoot(['/login']);
    }
  }


  removeCurrentTokenFromUser() {
    var uid = localStorage.getItem("uid");
    var token = localStorage.getItem("deviceToken");
    firebase.database().ref().child(`users/${uid}/deviceTokens`)
      .once("value")
      .then(snapshot => {
        var tokens: Array<any> = snapshot.val() || [];

        var index = tokens.indexOf(token);

        if (index >= 0) {
          tokens.splice(index, 1);

          if (tokens.length > 0) {
            firebase.database().ref().child(`users/${uid}/deviceTokens`).set(tokens);
          } else {
            firebase.database().ref().child(`users/${uid}/deviceTokens`).set(null);
          }
        }
      })
      .catch(err => {
        console.log(err.message);
      })
  }



}
