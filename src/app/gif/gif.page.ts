import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { DataCollectorService } from '../data-collector.service';
import * as firebase from 'firebase';
import { UtilsService } from '../utils.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-gif',
  templateUrl: './gif.page.html',
  styleUrls: ['./gif.page.scss'],
})
export class GifPage implements OnInit {

  public gifs:any=[];
  comment:any;
  allComments:any=[];
  searchTxt:string='';

  constructor(public http:HttpClient,public service:DataCollectorService, public utils:UtilsService,
    public navCntrl:NavController) { 
    if(this.service.postComments){
      this.allComments=this.service.postComments;
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
    this.getGifs();
  }

  ngOnInit() {
  }

  getGifs(){
    this.http.get('http://api.giphy.com/v1/gifs/trending?api_key=395aVSv77xZS2CgC2YmNNVVSjgLvAOG1').subscribe((data:any)=> {
    debugger;
    this.gifs=data.data;
  });
  }

  sendComment(url){
    debugger;
   
    if (url) {
    var updates={};
    var commentData:any={
      uid:localStorage.getItem('uid'),
      comment:this.comment || '',
      timestamp:Number(new Date())
    }
    commentData.commentTimestamp=moment(Number(new Date())).fromNow();
    if(url){
      commentData.commentsImages = url;
    }
    this.allComments.push(commentData);
    updates['posts/'+this.service.postKey+'/comments']=this.allComments;
    firebase.database().ref().update(updates).then(()=>{
    this.navCntrl.pop();
    this.service.postComments=this.allComments;
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

}
