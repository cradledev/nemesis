import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DataCollectorService } from '../data-collector.service';
import { UtilsService } from '../utils.service';
@Component({
  selector: 'app-suggested-users',
  templateUrl: './suggested-users.page.html',
  styleUrls: ['./suggested-users.page.scss'],
})
export class SuggestedUsersPage implements OnInit {

  public uid:any;
  allUsers:any=[];



  constructor(public service:DataCollectorService, public utils:UtilsService) {
    this.uid = localStorage.getItem('uid');
    debugger;
    this.service.getUser(this.uid);
    this.getAllUsers();
   }

  ngOnInit() {
  }

  getAllUsers(){
    firebase.database().ref().child('/users/').once('value',(snapshot)=>{
      var users=snapshot.val();
      for(var key in users){
        var user=users[key];
        if(user.uid != this.uid){
        debugger;
        if(!this.service.usersData[this.uid].followers.includes(user.uid)){
         this.allUsers.push(user);
        }
      }
      }
    })

  }

  toFollow(uid) {
    this.service.getUser(localStorage.getItem('uid'));
    this.service.getUser(this.uid);
    var followers = [];
    debugger;
    if (this.service.usersData[this.uid].followers) {
      followers = this.service.usersData[this.uid].followers;
    }
    followers.push(uid);
    var updates = {};
    updates['users/' + this.uid + '/followers'] = followers;
    firebase.database().ref().update(updates).then(() => {
      this.utils.createToast("Follower Added!");
    })
  }
  
  toUnFollow(uid) {

    this.service.getUser(localStorage.getItem('uid'));
    this.service.getUser(this.uid);
    var followers = [];
    debugger;
    if (this.service.usersData[this.uid].followers) {
      followers = this.service.usersData[this.uid].followers;
    }
    const findex = followers.indexOf(uid);
    if (findex > -1) {
      followers.splice(findex, 1);
    }
    debugger;
    var updates = {};
    updates['users/' + this.uid + '/followers'] = followers;
    firebase.database().ref().update(updates).then(() => {
      this.utils.createToast("Remove From Followers!");
    })
  }

}
