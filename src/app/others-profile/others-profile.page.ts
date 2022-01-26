import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataCollectorService } from '../data-collector.service';
import { UtilsService } from '../utils.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.page.html',
  styleUrls: ['./others-profile.page.scss'],
})
export class OthersProfilePage implements OnInit {

  activeTab = 'activity';
  dummyItems: any = [1, 2, 3, 4, 5, 6, 7];
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 2.3
  };
  uid:any;
  myUid:any;
  allUsers:any=[];
  
  constructor(public route:ActivatedRoute, public service:DataCollectorService, public utils:UtilsService, public router:Router) { 
    this.myUid=localStorage.getItem('uid');
    this.route.params.subscribe((params) => {
      this.uid = params['id'];
      this.service.getUser(this.uid);
      this.service.getUser(this.myUid);
      this.getAllUsers();
    })
  }

  getAllUsers(){
    firebase.database().ref().child('/users/').once('value',(snapshot)=>{
      var users=snapshot.val();
      for(var key in users){
        var user=users[key];
        if(user.uid != this.myUid){
        debugger;
        if(!this.service.usersData[this.myUid].followers.includes(user.uid)){
         this.allUsers.push(user);
        }
      }
      }
    })

  }

  toFollowOther(uid) {
    this.service.getUser(localStorage.getItem('uid'));
    this.service.getUser(this.uid);
    var followers = [];
    debugger;
    if (this.service.usersData[this.myUid].followers) {
      followers = this.service.usersData[this.myUid].followers;
    }
    followers.push(uid);
    var updates = {};
    updates['users/' + this.myUid + '/followers'] = followers;
    firebase.database().ref().update(updates).then(() => {
      this.utils.createToast("Follower Added!");
    })
  }
  
  toUnFollowOther(uid) {

    this.service.getUser(localStorage.getItem('uid'));
    this.service.getUser(this.uid);
    var followers = [];
    debugger;
    if (this.service.usersData[this.myUid].followers) {
      followers = this.service.usersData[this.myUid].followers;
    }
    debugger;
    const findex = followers.indexOf(uid);
    if (findex > -1) {
      followers.splice(findex, 1);
    }
    debugger;
    var updates = {};
    updates['users/' + this.myUid + '/followers'] = followers;
    firebase.database().ref().update(updates).then(() => {
      this.utils.createToast("Remove From Followers!");
    })
  }

  toFollow() {
    this.service.getUser(localStorage.getItem('uid'));
    this.service.getUser(this.uid);
    var followers = [];
    debugger;
    if (this.service.usersData[this.uid].followers) {
      followers = this.service.usersData[this.uid].followers;
    }
    followers.push(localStorage.getItem('uid'));
    var updates = {};
    updates['users/' + this.uid + '/followers'] = followers;
    firebase.database().ref().update(updates).then(() => {
      this.utils.createToast("Follower Added!");
    })
  }
  
  toUnFollow() {

    this.service.getUser(localStorage.getItem('uid'));
    this.service.getUser(this.uid);
    var followers = [];
    var follwings = [];
    debugger;
    if (this.service.usersData[this.uid].followers) {
      followers = this.service.usersData[this.uid].followers;
    }
    const findex = followers.indexOf(localStorage.getItem('uid'));
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

  ngOnInit() {
  }

  toChatScreen(){
    this.router.navigate(['/chat-screen/'+this.uid]);
  }

  viewDocument(){
    console.log("viewDocument");
  }
}
