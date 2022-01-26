import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, NavController, Platform, ModalController } from '@ionic/angular';
import { IonSlides} from '@ionic/angular';
import { DataCollectorService } from '../data-collector.service';
@Component({
  selector: 'app-view-story',
  templateUrl: './view-story.page.html',
  styleUrls: ['./view-story.page.scss'],
})
export class ViewStoryPage implements OnInit {
 
  stories = new Array<any>();
  tapped: any;
  userId: number = 1;
  isPaused: boolean = false;
  video: any;
  isWaiting: boolean = false;
  showViewers: boolean;
  uid:any;
  allUsers: any = [
    { profileUrl: './assets/imgs/user9.png' },
    { profileUrl: './assets/imgs/user8.png' },
    { profileUrl: './assets/imgs/user7.png' },
    { profileUrl: './assets/imgs/user6.png' },
    { profileUrl: './assets/imgs/user9.png' },
    { profileUrl: './assets/imgs/user8.png' },
    { profileUrl: './assets/imgs/user7.png' },
    { profileUrl: './assets/imgs/user6.png' },
  ]
  width: number = 0;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    private platform: Platform, public service:DataCollectorService) {
    this.uid=localStorage.getItem('uid');
    this.changeProgressbar();
    this.stories = this.navParams.get("stories");
    this.tapped = this.navParams.get("tapped");

  }

  ngOnInit() {
  }

  changeProgressbar(){
    var self=this;
    var interval = setInterval(()=> {
      self.width += 0.01;
      if (self.width >= 1) {
        debugger;
        self.closeStoryViewer();
          clearInterval(interval);
      }
  },100);
  }




  closeModal(e: any) {
    if (e.target.id === 'mainContainer') {
      this.showViewers = false;
    }
  }

  

  closeStoryViewer() {
    debugger;
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  

}
