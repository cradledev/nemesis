import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { DataCollectorService } from '../data-collector.service';
import * as moment from 'moment';
import { IonContent } from '@ionic/angular';
import * as firebase from 'firebase';
import { UtilsService } from '../utils.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.page.html',
  styleUrls: ['./post-comments.page.scss'],
})
export class PostCommentsPage implements OnInit {
  @ViewChild(IonContent, { read: IonContent, static: false }) content: IonContent;
  comments: any = [
    {
      profileUrl: './assets/imgs/user1.png',
      fullName: 'Angelina Julie',
      replies: [
        { fullName: 'Marrie Doe' },
        { fullName: 'Smith Jam' },
        { fullName: 'John Doe' }
      ]
    },
    {
      profileUrl: './assets/imgs/user2.png',
      fullName: 'Samya Julie',
      video: './assets/imgs/post2.png'
    },
    {
      profileUrl: './assets/imgs/user3.png',
      fullName: 'Marrie Julie',
      replies: [
        { fullName: 'Marrie Doe' },
        { fullName: 'Smith Jam' },
        { fullName: 'John Doe' },
        { fullName: 'Marrie Doe' },
        { fullName: 'Smith Jam' },
        { fullName: 'John Doe' }
      ]
    }
  ]

  allComments:any =[];
  showBottom: any=false;
  showTop: any=true;
  public comment:string='';
  commentsImages: any=[];
  commentsVideos: any=[];
  commentImgObj:any=[];
  commentImgUrl:any=[];
  commentVideoObj:any=[];
  commentVideoUrl:any=[];
  commentIndex: any;
  currentPlayingVideo: HTMLVideoElement;
  uid:any= localStorage.getItem('uid');
  toggled: boolean = false;
message: string;
  gifs: any=[];
  showGif: boolean;
 
  constructor(public service:DataCollectorService, public utils:UtilsService, public zone:NgZone, public router:Router, public http:HttpClient) { 
    if(this.service.postComments){
      this.allComments=this.service.postComments;
      this.scrollToBottom();
    }
    if(this.allComments){
    for(var i=0;i<this.allComments.length;i++){
      this.allComments[i].commentTimestamp=moment(this.allComments[i].timestamp).fromNow();
      this.service.getUser(this.allComments[i].uid);
      if(this.allComments[i].replies){
        for(var j=0;j<this.allComments[i].replies.length;j++){
          this.allComments[i].replies[j].commentTimestamp=moment(this.allComments[i].replies[j].timestamp).fromNow();
          this.service.getUser(this.allComments[i].replies[j].uid);
        }
      }
     
    }

  }
  }

  toCommentIndex(i){
  this.service.currentComment=this.allComments[i];
  this.service.commentIndex=i;
  this.router.navigate(['/comments-reply']) 
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
      if (files[a].type == 'image/png' || files[a].type == 'image/jpeg') {
        this.commentImgObj.push(files[a]);
        (function (file) {
          var imageReader = new FileReader();
          imageReader.onload = (file) => {
            debugger;
           self.commentImgUrl.push(imageReader.result);
           if(self.commentImgUrl.length){
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

  sendComment(url?){
    debugger;
   
    if (this.comment || this.commentsImages.length || this.commentsVideos.length || url) {
    var updates={};
    var commentData:any={
      uid:localStorage.getItem('uid'),
      comment:this.comment || '',
      timestamp:Number(new Date())
    }
    commentData.commentTimestamp=moment(Number(new Date())).fromNow();
    if (this.commentsImages.length) {
      commentData.commentsImages = this.commentsImages;
    }
    if (this.commentsVideos.length) {
      commentData.commentsVideos = this.commentsVideos;
    }
    if(url){
      commentData.commentsImages = url;
      this.showGif=false;
    }
    this.allComments.push(commentData);
    updates['posts/'+this.service.postKey+'/comments']=this.allComments;
    this.scrollToBottom();
    firebase.database().ref().update(updates).then(()=>{
    this.utils.createToast("Comment Posted!");
    this.utils.stopLoading();
    this.comment="";
    })
  }
  else{
    this.utils.stopLoading();
    return;
    
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
    this.utils.presentLoading('Sending File');
    this.zone.run(() => {
      debugger;
      for (var i = 0; i < self.commentImgUrl.length; i++) {
        let storageRef = firebase.storage().ref();
        const filename = Math.floor(Date.now() / 1000);
        const imageRef = storageRef.child(`profileImages/${filename}.jpg`);

        imageRef.putString(self.commentImgUrl[i], firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
          firebase.storage().ref('profileImages/' + snapshot.metadata.name).getDownloadURL().then((url) => {
            self.commentsImages.push(url);
            debugger;
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
    this.utils.presentLoading('Sending File');
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

  toLike(comment,index) {
    var updates = {};
    if (!comment.likes) {
      comment.likes = [];
    }

    if (comment.likes.includes(localStorage.getItem('uid'))) {
      const index = comment.likes.indexOf(localStorage.getItem('uid'));
      if (index > -1) {
        comment.likes.splice(index, 1);
      }
    }
    else {
      if (comment.dislikes) {
        if (comment.dislikes.includes(localStorage.getItem('uid'))) {
          const index = comment.dislikes.indexOf(localStorage.getItem('uid'));
          if (index > -1) {
            comment.dislikes.splice(index, 1);
          }
        }
      }
      comment.likes.push(localStorage.getItem('uid'));
    }
    if (comment.dislikes) {
      updates['posts/'+this.service.postKey+'/comments/'+index+'/dislikes'] = comment.dislikes;
    }

    updates['posts/'+this.service.postKey+'/comments/'+index+'/likes'] = comment.likes;
    firebase.database().ref().update(updates).then(() => {

    })



  }


  toDislike(comment,index) {
    var updates = {};
    if (!comment.dislikes) {
      comment.dislikes = [];
    }

    if (comment.dislikes.includes(localStorage.getItem('uid'))) {
      const index = comment.dislikes.indexOf(localStorage.getItem('uid'));
      if (index > -1) {
        comment.dislikes.splice(index, 1);
      }
    }
    else {
      if (comment.likes) {
        if (comment.likes.includes(localStorage.getItem('uid'))) {
          const index = comment.likes.indexOf(localStorage.getItem('uid'));
          if (index > -1) {
            comment.likes.splice(index, 1);
          }
        }
      }
      comment.dislikes.push(localStorage.getItem('uid'));
    }
    updates['posts/'+this.service.postKey+'/comments/'+index+'/dislikes'] = comment.dislikes;
    if (comment.likes) {
      updates['posts/'+this.service.postKey+'/comments/'+index+'/likes'] = comment.likes;
    }

    firebase.database().ref().update(updates).then(() => {

    })



  }



  toLikeReply(reply,index,commentIndex) {
    var updates = {};
    if (!reply.likes) {
      reply.likes = [];
    }

    if (reply.likes.includes(localStorage.getItem('uid'))) {
      const index = reply.likes.indexOf(localStorage.getItem('uid'));
      if (index > -1) {
        reply.likes.splice(index, 1);
      }
    }
    else {
      if (reply.dislikes) {
        if (reply.dislikes.includes(localStorage.getItem('uid'))) {
          const index = reply.dislikes.indexOf(localStorage.getItem('uid'));
          if (index > -1) {
            reply.dislikes.splice(index, 1);
          }
        }
      }
      reply.likes.push(localStorage.getItem('uid'));
    }
    if (reply.dislikes) {
      updates['posts/'+this.service.postKey+'/comments/'+commentIndex+'/replies/'+index+'/dislikes'] = reply.dislikes;
    }

    updates['posts/'+this.service.postKey+'/comments/'+commentIndex+'/replies/'+index+'/likes'] = reply.likes;
    firebase.database().ref().update(updates).then(() => {

    })



  }


  toDislikeReply(reply,index,commentIndex) {
    var updates = {};
    if (!reply.dislikes) {
      reply.dislikes = [];
    }

    if (reply.dislikes.includes(localStorage.getItem('uid'))) {
      const index = reply.dislikes.indexOf(localStorage.getItem('uid'));
      if (index > -1) {
        reply.dislikes.splice(index, 1);
      }
    }
    else {
      if (reply.likes) {
        if (reply.likes.includes(localStorage.getItem('uid'))) {
          const index = reply.likes.indexOf(localStorage.getItem('uid'));
          if (index > -1) {
            reply.likes.splice(index, 1);
          }
        }
      }
      reply.dislikes.push(localStorage.getItem('uid'));
    }
    updates['posts/'+this.service.postKey+'/comments/'+commentIndex+'/replies/'+index+'/dislikes'] = reply.dislikes;
    if (reply.likes) {
      updates['posts/'+this.service.postKey+'/comments/'+commentIndex+'/replies'+index+'/likes'] = reply.likes;
    }

    firebase.database().ref().update(updates).then(() => {

    })



  }
  handleSelection(event) {
    this.comment += event.char;
  }

  getGifs(){
    this.http.get('http://api.giphy.com/v1/gifs/trending?api_key=395aVSv77xZS2CgC2YmNNVVSjgLvAOG1').subscribe((data:any)=> {
      this.gifs=data.data;
      this.showGif=true;
      //console.log(this.values);
  });
  }
  

  ngOnInit() {
  }

}
