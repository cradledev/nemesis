import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-confirm-contact',
  templateUrl: './confirm-contact.page.html',
  styleUrls: ['./confirm-contact.page.scss'],
})
export class ConfirmContactPage implements OnInit {

  selectedContacts: Array<any> = [];

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.selectedContacts = navParams.data.pickedContacts;
  }

  ngOnInit() {

  }


  removeContact(i) {
    this.selectedContacts.splice(i, 1);
  }


  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


  submit() {
    this.modalCtrl.dismiss({
      'dismissed': true,
      'selectedContacts': this.selectedContacts
    });
  }

}
