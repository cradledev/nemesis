import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DataCollectorService } from '../data-collector.service';
import { UtilsService } from '../utils.service';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  activeTab = 'activity';
  dummyItems: any = [1, 2, 3, 4, 5, 6, 7];
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 2.3
  };
  userObj:any;

  constructor(public service:DataCollectorService,public utils:UtilsService, public documentViewer:DocumentViewer) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    var self = this;
    firebase.database().ref().child('users/' + localStorage.getItem('uid'))
      .once('value', (snapshot) => {
        var user = snapshot.val();
        if (user) {
          self.userObj = user;
          this.service.userObj = self.userObj;
        }
      }).catch((e) => {
        self.utils.createToast(e.message);
      });
  }

  viewDocument(){
    const options: DocumentViewerOptions = {
      title: 'Nemesisvs.com'
    }
    this.documentViewer.viewDocument('assets/imgs/Roheel-CV.pdf', 'application/pdf', options)
  }

}
