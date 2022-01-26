import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public navCtrl:NavController) { }

  ngOnInit() {
  }

  logoutUser() {
    var token = localStorage.getItem('deviceToken');
    localStorage.clear();
    localStorage.setItem('deviceToken', token);
    var user = firebase.auth().currentUser;
    if (user != null) {
      firebase.auth().signOut().then(() => {
        localStorage.setItem("userLoggedIn", "false");
        this.navCtrl.navigateRoot(['/login']);
      })
        .catch((e) => {
          alert(e.message);
        })
    } else {
      this.navCtrl.navigateRoot(['/login']);
    }
  }

}
