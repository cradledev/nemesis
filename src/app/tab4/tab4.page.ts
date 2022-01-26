import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DataCollectorService } from '../data-collector.service';
import * as moment from 'moment';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  allNotification:any=[];
  constructor(public service:DataCollectorService) { }

  ngOnInit() {
    this.getAllNotifications();
  }

  getAllNotifications(){
    firebase.database().ref().child('notifications/'+localStorage.getItem('uid'))
    .once('value',(snapshot)=>{
      var notifications=snapshot.val();
      for(var key in notifications){
        var notification=notifications[key];
        this.service.getUser(notification.uid);
        debugger;
        notification.fromNow = moment(notification.timestamp).fromNow();
        this.allNotification.push(notification);
      }
    })

  }

}
