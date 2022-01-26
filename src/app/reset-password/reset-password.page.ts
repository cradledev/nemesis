import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public email:any;
  constructor(public utils:UtilsService, public navCtrl:NavController) { }

  ngOnInit() {
  }

  resetPassword() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var showError = !re.test(String(this.email).toLowerCase());
    if (showError) {
      this.utils.createToast('Invalid Email Pattern!');
      return
    }

    var self = this;
    self.utils.presentLoading();
    firebase.auth().sendPasswordResetEmail(self.email)
      .then(() => {
        self.utils.stopLoading();
        self.utils.createToast("Click the link sent in mail and follow the instructions!");
        self.navCtrl.back();
      })
      .catch((e) => {
        self.utils.stopLoading();
        self.utils.createToast(e.message);
      })
  }

}
