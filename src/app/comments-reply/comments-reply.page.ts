import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { DataCollectorService } from '../data-collector.service';
import { UtilsService } from '../utils.service';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-comments-reply',
  templateUrl: './comments-reply.page.html',
  styleUrls: ['./comments-reply.page.scss'],
})
export class CommentsReplyPage implements OnInit {
  comment: any;
  commentsImages: any=[];
  commentsVideos: any=[];
  commentImgObj:any=[];
  commentImgUrl:any=[];
  commentVideoObj:any=[];
  commentVideoUrl:any=[];
  commentIndex: any;
  text:any;
  @ViewChild(IonContent, { read: IonContent, static: false }) content: IonContent;
  currentPlayingVideo: HTMLVideoElement;

  constructor(public service:DataCollectorService, public utils:UtilsService, public zone:NgZone) { 
    this.comment=this.service.currentComment;
    this.commentIndex=this.service.commentIndex;
  
    
  }


  ngOnInit() {
  }

  toGalleryMedia() {
    var el = document.getElementById('galleryMedia');
    el.click();
  }

  onChangeFileGallery(event: EventTarget) {
    
    console.log(event);
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    var self = this;
    for (var a = 0; a < files.length; a++) {
      debugger;
      if (files[a].type == 'image/png' || files[a].type == 'image/jpeg') {
        debugger;
        this.commentImgObj.push(files[a]);
        (function (file) {
          var imageReader = new FileReader();
          imageReader.onload = (file) => {
            self.commentImgUrl.push(imageReader.result);
            if(self.commentImgUrl){
              self.galleryMedia();
            }
          }
         
          imageReader.readAsDataURL(file)
        })(files[a]);
      }
      else {
        this.commentVideoObj.push(files[a]);
        (function (file) {
          var videoReader = new FileReader();
          videoReader.onload = (file) => {
            self.commentVideoUrl.push(videoReader.result);
            if(self.commentVideoUrl.length){
              self.galleryVideo();
            }
          }
          
          
          videoReader.readAsDataURL(file)
        })(files[a]);
      }
    }
   
  }

  sendComment(){
    if (!this.text || !this.commentsImages || !this.commentsVideos) {
      return;
    }
    var updates={};
    var commentData:any={
      uid:localStorage.getItem('uid'),
      comment:this.text || '',
      timestamp:Number(new Date())
    }
    commentData.commentTimestamp=moment(Number(new Date())).fromNow();
    if (this.commentsImages.length) {
      commentData.commentsImages = this.commentsImages;
    }
    if (this.commentsVideos.length) {
      commentData.commentsVideos = this.commentsVideos;
    }
    if(!this.comment.replies){
      this.comment.replies=[];
    }
    if(this.comment.replies){
      this.comment.replies.push(commentData);
    }

    updates['posts/'+this.service.postKey+'/comments/'+this.commentIndex+'/replies']=this.comment.replies;
    this.scrollToBottom();
    firebase.database().ref().update(updates).then(()=>{
    this.utils.createToast("Posted!");
    this.utils.stopLoading();
    this.text="";
    })

  }

  onPlayingVideo(event) {
    event.preventDefault();
    // play the first video that is chosen by the user
    if (this.currentPlayingVideo === undefined) {
      this.currentPlayingVideo = event.target;
      this.currentPlayingVideo.play();
    } else {
      // if the user plays a new video, pause the last one and play the new one
      if (event.target !== this.currentPlayingVideo) {
        this.currentPlayingVideo.pause();
        this.currentPlayingVideo = event.target;
        this.currentPlayingVideo.play();
      }
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }


  galleryMedia() {
    var self = this;
    this.utils.presentLoading('Sending Image');
    this.zone.run(() => {
      debugger;
      for (var i = 0; i < self.commentImgUrl.length; i++) {
        let storageRef = firebase.storage().ref();
        const filename = Math.floor(Date.now() / 1000);
        const imageRef = storageRef.child(`profileImages/${filename}.jpg`);

        imageRef.putString(self.commentImgUrl[i], firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
          firebase.storage().ref('profileImages/' + snapshot.metadata.name).getDownloadURL().then((url) => {
            self.commentsImages.push(url);
            var j = 0;

            if (j == self.commentImgObj.length - 1) {
              if (self.commentVideoUrl.length) {
                this.galleryVideo();
              }
              else {
                self.sendComment();
              }

            }
            else {
              j++;
            }
          })
            .catch((e) => {
              this.utils.stopLoading();
              alert(e.message);
            })
        })
      }

    })

  }
  galleryVideo() {
    var self = this;
    this.utils.presentLoading('Sending Image');
    this.zone.run(() => {
      for (var i = 0; i < self.commentVideoUrl.length; i++) {
        let storageRef = firebase.storage().ref();
        const filename = Math.floor(Date.now() / 1000);
        const imageRef = storageRef.child(`profileImages/${filename}.mp4`);

        imageRef.putString(self.commentVideoUrl[i], firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
          firebase.storage().ref('profileImages/' + snapshot.metadata.name).getDownloadURL().then((url) => {
            self.commentsVideos.push(url);
            var j = 0;
            if (j == self.commentVideoObj.length - 1) {
              self.sendComment();
            }
            else {
              j++;
            }
          })
            .catch((e) => {
              this.utils.stopLoading();
              alert(e.message);
            })
        })
      }

    })

}
}
