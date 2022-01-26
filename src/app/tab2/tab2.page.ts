import { Component, OnInit, NgZone } from '@angular/core';
import { DataCollectorService } from '../data-collector.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UtilsService } from '../utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  dummyItems: any = [1, 2, 3, 4, 5, 6];

  slides: any = [
    { img: './assets/imgs/user12.png' },
    { img: './assets/imgs/user4.png' },
    { img: './assets/imgs/user5.png' },
    { img: './assets/imgs/story1.png' },
    { img: './assets/imgs/user12.png' },
    { img: './assets/imgs/user4.png' },
    { img: './assets/imgs/user5.png' },
    { img: './assets/imgs/story1.png' },
  ];

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 2
  };
  public uid:any;
  public users:any=[];
  chatInitialted:any;
  allUsers:any=[];
  compose:any=false;


  constructor(public service:DataCollectorService, public router:Router, 
    public utils:UtilsService, public zone:NgZone) { 
    this.uid=localStorage.getItem('uid');
    this.service.getUser(this.uid);
    debugger;
    if(this.service.usersData[this.uid].favorites){
      for(var i=0;i<this.service.usersData[this.uid].favorites.length;i++){
        this.service.getUser(this.service.usersData[this.uid].favorites[i]);
      }
    }
    this.getAllUsers();
  }

  ngOnInit() {

  }

  toChat(uid){
    this.router.navigate(['chat-screen/'+uid]);
  }


  getAllUsers() {
    this.users = [];

    firebase.database().ref().child("users")
      .once("value")
      .then((snapshot) => {
        var usersArr = snapshot.val();

        var promises = [];
        for (var key in usersArr) {
          this.allUsers.push(usersArr[key]);
          if (usersArr[key].uid && key !== this.uid) {
            usersArr[key].lastMessageTimestamp = 0;
            this.users.push(usersArr[key]);
            var p = this.getLastMessage(key, this.users.length - 1);
            promises.push(p);
          }
        }

        Promise.all(promises)
          .then(() => {
            this.users = this.users.sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);
          });

        this.utils.stopLoading();
      })
      .catch(err => {
        this.utils.stopLoading();
        alert(err.message);
      });
  }

  getLastMessage(recipientId, index) {
    var chatKey = "";
    if (this.uid < recipientId) {
      chatKey = this.uid + "-" + recipientId;
    } else {
      chatKey = recipientId + "-" + this.uid;
    }
    return firebase.database().ref().child(`chats/${chatKey}`)
      .once("value")
      .then(snapshot => {
        var chats = snapshot.val();
        var uid = localStorage.getItem('uid');

        if (chats) {
          var lastDeleted = chats[uid];
          chats = chats.messages;
        }
        if (chats) {
          this.zone.run(() => {
            if (!this.chatInitialted) {
              this.chatInitialted = true;
            }
            this.users[index].alreadyChated = true;
            debugger;
          });

          for (var key in chats) {
            var chat = chats[key];
            chat.key = key;
            if (chat.image) {
              this.users[index].lastMessage = "Image";
              this.users[index].isImage = true;
            } else {
              this.users[index].lastMessage = chat.message;
            }

            this.users[index].lastMessageTime = moment(chat.timestamp).fromNow();
            this.users[index].lastMessageTimestamp = chat.timestamp;
            this.users[index].status = chat.status;
            this.users[index].messageKey = chat.key;
            this.users[index].chatKey = chatKey;

            if (lastDeleted > this.users[index].lastMessageTimestamp) {
              this.zone.run(() => {
                this.users[index].alreadyChated = false;
              });
            }

            if (chat.deleteStatus) {
              this.users[index].status = chat.status;
            }
          }
        } else {
          this.zone.run(() => {
            this.users[index].alreadyChated = false;
          });
        }
        return true;
      });
  }


}
