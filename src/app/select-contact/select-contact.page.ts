import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController, IonInput } from '@ionic/angular';
import { Contacts, ContactFindOptions } from '@ionic-native/contacts';
declare var navigator;
@Component({
  selector: 'app-select-contact',
  templateUrl: './select-contact.page.html',
  styleUrls: ['./select-contact.page.scss'],
})
export class SelectContactPage implements OnInit {

  @ViewChild('search', { static: false }) search: IonInput;

  allContacts: Array<any> = [];
  selectedContacts: Array<any> = [];
  allSelected: boolean;

  constructor(
    public contacts: Contacts,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.selectedContacts = navParams.data.pickedContacts || [];
  }


  ngOnInit() {
    setTimeout(() => {
      this.search.setFocus();
    }, 500);
  }


  chooseContacts(query: string) {
    if (!query) {
      this.filterSelectedContacts();
      return;
    }

    if (query.length >= 3) {
      var options = new ContactFindOptions();
      var self = this;
      options.filter = query;
      navigator.contacts.find(['*'], onSuccess, onError, options);

      function onSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
          if (contacts[i].displayName && contacts[i].phoneNumbers) {
            var temp = {
              name: contacts[i].displayName,
              phone: contacts[i].phoneNumbers[0].value.replace(/\s/g, '')
            };
            self.allContacts.unshift(temp);
          }
        }
      }

      function onError(contactError) {
        console.log(contactError);
      }
    }
  }


  getSelectedContacts(): number {
    var selected = 0;
    this.allContacts.forEach(x => {
      if (x.checked) {
        selected++
      }
    });
    return selected + this.selectedContacts.length;
  }


  selectAll() {
    if (this.allContacts.length) {
      if (!this.allSelected) {
        this.allContacts.forEach(x => {
          x.checked = true;
        });
      } else {
        this.allContacts.forEach(x => {
          x.checked = false;
        });
      }
    }
  }


  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


  filterSelectedContacts(dismiss?) {
    this.allContacts.forEach(x => {
      if (x.checked) {
        this.selectedContacts.push(x);
      }
    });

    this.allContacts = [];
    this.selectedContacts = this.selectedContacts.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.name === thing.name
      ))
    )

    if (dismiss) {
      this.modalCtrl.dismiss({
        'dismissed': true,
        'selectedContacts': this.selectedContacts
      });
    }
  }


  submit() {
    this.filterSelectedContacts('dismiss');
  }

}
