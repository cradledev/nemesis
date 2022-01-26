import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.page.html',
  styleUrls: ['./advance-search.page.scss'],
})
export class AdvanceSearchPage implements OnInit {
  searchTxt:any='';
  age:Number;
  gender:String;
  city:String;
  
  users: any = [
    // { img: './assets/imgs/user1.png' },
    // { img: './assets/imgs/user2.png' },
    // { img: './assets/imgs/user3.png' },
    // { img: './assets/imgs/user4.png' },
    // { img: './assets/imgs/user5.png' },
    // { img: './assets/imgs/user6.png' },
    // { img: './assets/imgs/user7.png' },
    // { img: './assets/imgs/user8.png' },
    // { img: './assets/imgs/user9.png' },
  ];

  constructor(public router:Router) { 
    this.getAllUsers();
  }

  ngOnInit() {
  }


  getAllUsers(){
    firebase.database().ref('users/').once('value',(snapshot)=>{
      var users=snapshot.val();
      for(var key in users){
        var user=users[key];
        this.users.push(user);
      }
    })
  }

  toOtherProfile(uid) {
    this.router.navigate(['others-profile/' + uid])
  }

}
