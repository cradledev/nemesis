import { Component, OnInit } from '@angular/core';
import { DataCollectorService } from '../data-collector.service';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-blocked-list',
  templateUrl: './blocked-list.page.html',
  styleUrls: ['./blocked-list.page.scss'],
})
export class BlockedListPage implements OnInit {
  public uid:any;
  constructor(public service:DataCollectorService, public alertController:AlertController, public utils:UtilsService) { 
   
   this.getBlockedUsers();

  }
  getBlockedUsers(){
    this.uid=localStorage.getItem('uid');
    this.service.getUser(this.uid);
    if(this.service.usersData[this.uid].blocks){
    for(var i=0;i<this.service.usersData[this.uid].blocks.length;i++){
      this.service.getUser(this.service.usersData[this.uid].blocks[i]);
    }
  }
  }

  async ublockUser(uid){

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
              var a = blocks.indexOf(uid);
              blocks.splice(a,1);
              updates['users/' + this.uid + '/blocks'] = blocks;
              firebase.database().ref().update(updates).then(()=>{
                this.getBlockedUsers();
              this.utils.createToast('Unblocked successfully!');
             
              })
            }
          }
        }
      ]
    });

    await alert.present();

  }


  ngOnInit() {
  }





}
