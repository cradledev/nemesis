import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-chnage-password',
  templateUrl: './chnage-password.page.html',
  styleUrls: ['./chnage-password.page.scss'],
})
export class ChnagePasswordPage implements OnInit {

  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor(
    public utils: UtilsService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  updatePassword() {
    if (this.newPassword != this.confirmNewPassword) {
      this.utils.createToast('New passwords mismatch!');
      return
    }

    var self = this;
    var user = JSON.parse(localStorage.getItem('userData'));

    self.utils.presentLoading();
    firebase.auth().signInWithEmailAndPassword(user.email, self.currentPassword)
      .then((user) => {
        if (user) {
          firebase.auth().currentUser.updatePassword(self.newPassword).then(() => {
            self.utils.stopLoading();
            self.utils.createToast('Password updated successfully!');
            self.navCtrl.back();
          })
            .catch((e) => {
              self.utils.stopLoading();
              self.utils.createToast(e.message);
            });
        } else {
          self.utils.stopLoading();
          self.navCtrl.back();
        }
      })
      .catch((e) => {
        self.utils.stopLoading();
        self.utils.createToast(e.message);
      });
  }



}
