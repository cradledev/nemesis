import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewStoryPage } from '../view-story/view-story.page';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import * as firebase from 'firebase';
import { UtilsService } from '../utils.service';
import { File } from '@ionic-native/file/ngx';
import { DataCollectorService } from '../data-collector.service';
import { CreateTextStatusPage } from '../create-text-status/create-text-status.page';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  imgs: any = [
    '/assets/imgs/story1.png', '/assets/imgs/story2.png', '/assets/imgs/story3.png', '/assets/imgs/story4.png',
    '/assets/imgs/post1.png', '/assets/imgs/post2.png', '/assets/imgs/user5.png', '/assets/imgs/story1.png'
  ]

  public stories: any = [];
  imageUrl: string;
  videoPath: string;
  videoName: string;
  videoDataUrl: any;

  constructor(public modalCtrl: ModalController, private mediaCapture: MediaCapture,
     public utils: UtilsService, public zone: NgZone,private file: File, public service:DataCollectorService) {
    let storyItem1 = {
      userPicture: "./assets/imgs/user1.png",
      userId: 1,
      userName: "Igor",
      currentItem: 0,
      items: [{
        date: "há 20 minutos",
        duration: "5",
        id: "3",
        media: "/assets/imgs/story1.png",
        seen: true,
        type: "0",
        views: 5
      }],
      seen: true
    };

    let storyItem2 = {
      userPicture: "./assets/imgs/user1.png",
      userId: 2,
      userName: "Flávio",
      currentItem: 0,
      seen: false,
      items: [{
        date: "há 30 minutos",
        duration: "4",
        id: "64",
        media: "/assets/imgs/story2.png",
        seen: false,
        type: "0",
        views: null
      }, {
        date: "há 30 minutos",
        duration: "3",
        id: "74",
        media: "/assets/imgs/story3.png",
        seen: false,
        type: "0",
        views: null
      }, {
        date: "há 1 hora",
        duration: null,
        id: "84",
        media: "/assets/imgs/story4.png",
        seen: false,
        type: "1",
        views: null
      }]
    };

    let storyItem3 = {
      userPicture: "./assets/imgs/user1.png",
      userId: 1,
      userName: "Igor",
      currentItem: 0,
      items: [{
        date: "há 20 minutos",
        duration: "5",
        id: "3",
        media: "/assets/imgs/post1.png",
        seen: true,
        type: "0",
        views: 5
      }],
      seen: true
    };

    let storyItem4 = {
      userPicture: "./assets/imgs/user1.png",
      userId: 2,
      userName: "Flávio",
      currentItem: 0,
      seen: false,
      items: [{
        date: "há 30 minutos",
        duration: "4",
        id: "64",
        media: "/assets/imgs/post1.png",
        seen: false,
        type: "0",
        views: null
      }, {
        date: "há 30 minutos",
        duration: "3",
        id: "74",
        media: "/assets/imgs/post2.png",
        seen: false,
        type: "0",
        views: null
      }, {
        date: "há 1 hora",
        duration: null,
        id: "84",
        media: "/assets/imgs/post3.png",
        seen: false,
        type: "1",
        views: null
      }]
    };

    let storyItem5 = {
      userPicture: "./assets/imgs/user1.png",
      userId: 1,
      userName: "Igor",
      currentItem: 0,
      items: [{
        date: "há 20 minutos",
        duration: "5",
        id: "3",
        media: "/assets/imgs/post4.png",
        seen: true,
        type: "0",
        views: 5
      }],
      seen: true
    };

    // this.stories.push(storyItem1);
    // this.stories.push(storyItem2);
    // this.stories.push(storyItem3);
    // this.stories.push(storyItem4);
    // this.stories.push(storyItem5);
  }

  ngOnInit() {
    this.getAllStories();
  }

  // addStory(type,color,text) {
    addStory() {
    debugger;
    // let options: CaptureVideoOptions = {limit:1,duration:30,quality:80};
    // this.mediaCapture.captureVideo(options)
    //   .then(
    //     (data: MediaFile[]) => {
    //        console.log(data);
    //       for (var i = 0, len = data.length; i < len; i += 1) {
    //         debugger;
    //         this.videoPath = data[i].fullPath;
    //         this.videoPath = this.videoPath.substr(0, this.videoPath.lastIndexOf('/') + 1);
    //         this.videoName = data[i].name;
    //       }

    //       this.file.readAsDataURL(this.videoPath, this.videoName).then(res => {
    //         console.log("readAsDataURL res");
    //         console.log(res);
    //         this.videoDataUrl = res;
            
    //       this.galleryVideo(this.videoDataUrl,this.videoName);
    //       console.log(data)
    //       })
    //     },
    //     (err: CaptureError) => console.error(err)
    //   );
  }

  galleryVideo(data,name) {
    var self = this;
    this.utils.presentLoading('Uploading');
    this.zone.run(() => {
      let storageRef = firebase.storage().ref();
      const filename = Math.floor(Date.now() / 1000);
      const imageRef = storageRef.child(`profileImages/${name+filename}.mp4`);

      imageRef.putString(data, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
        firebase.storage().ref('profileImages/' + snapshot.metadata.name).getDownloadURL().then((url) => {

          self.saveStoryToFirebase(url);
        })
          .catch((e) => {
            this.utils.stopLoading();
            alert(e.message);
          })
      })
    })
  }


  saveStoryToFirebase(url) {
    var postData = {
      url: url,
      uid: localStorage.getItem('uid'),
      timestamp: Number(new Date)
    }
    firebase.database().ref('stories').push(postData).key;
    this.stories.push(postData);
    this.utils.stopLoading();
  }


  async openStoryViewer(index) {
    const modal = await this.modalCtrl.create({
      component: ViewStoryPage,
      componentProps: {
        stories: this.stories,
        tapped: index
      }
    });
    await modal.present();
  }
  getAllStories() {
    firebase.database().ref('stories').once('value', (snapshot) => {
      var stories = snapshot.val();
      for (var key in stories) {
        var story = stories[key];
        story.key = key;
        this.service.getUser(story.uid);
        this.stories.push(story);
      }
    })
  }

  reorderStories() {
    this.stories.sort((a, b) => {
      if (a.seen) return 1;
      if (b.seen) return -1;

      return 0;
    });
  }

  async openTextModal(){
    const modal = await this.modalCtrl.create({
      component: CreateTextStatusPage,
      componentProps: {
        cssClass: "",
      }
    });
    await modal.present();
    modal.onDidDismiss()
      .then((data:any) => {
        // this.addStory('text',data.data.color,data.data.text);
        this.addStory();
    });
  }

  


}
