import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataCollectorService {

  public usersData: any = {};
  userObj:any={};
  public fooSubject = new Subject<any>();
  currentMusic:any;
  allMusics:any=[];
  postComments:any;
  postKey:any;
  currentComment:any;
  commentIndex:any;

  constructor(public zone: NgZone) { }
  

  publishSomeData(data: any) {
    this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.fooSubject;
  }
  getUser(uid) {
    if (this.usersData[uid]) {
      return Promise.resolve();
    }

    this.usersData[uid] = {};

    firebase.database().ref(`/users/${uid}`)
      .on("value", (snapshot, previous) => {
        this.zone.run(() => {
          this.usersData[uid] = snapshot.val();
        })
      });

    return firebase.database().ref(`/users/${uid}`)
      .once("value")
      .then(snapshot => {
        this.zone.run(() => {
          this.usersData[uid] = snapshot.val();
        })
        return true;
      });
  }

  sendNewNotification(title, message, deviceToken, data?) {
    for (var i = 0; i < deviceToken.length; i++) {
      debugger;
      // firebase.app().functions("asia-northeast1").httpsCallable('sendNotification');
      var addMessage = firebase.functions().httpsCallable('sendNotification');
      addMessage({
        title: title,
        message: message,
        data: data || "",
        deviceToken: deviceToken[i],
      }).then((result) => {
      }, (error) => {
        alert(error);
      });
    }
  }

  saveNotificationToFirebase(uid,mUid, message, title, data?) {
    var postData = {
      title: title,
      message: message,
      user: uid,
      uid:mUid,
      timestamp: Number(new Date()),
      data: data || ""
    };
    firebase.database().ref().child("notifications/" + uid).push(postData).key;
  }


  




}
