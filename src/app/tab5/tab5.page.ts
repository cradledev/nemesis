import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { DataCollectorService } from '../data-collector.service';
import { IonRange, LoadingController, Platform, ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import {
  FileTransfer,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  activeTab = 'charts';
  dummyItems: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  showFooter: any = false;
  @ViewChild('player') player: ElementRef;
  @ViewChild('range') range: IonRange;
  musicList: Array<any> = [
    './assets/imgs/music2.png', './assets/imgs/music3.png', './assets/imgs/music4.png', './assets/imgs/music5.png',
  ];
  allMusics: any = [];

  currentTime: any = 0;
  playList: Array<any> = [
    { img: './assets/imgs/post1.png', title: 'Most Played' },
    { img: './assets/imgs/post2.png', title: 'Recently Played' },
    { img: './assets/imgs/post3.png', title: 'Newly Added' },
    { img: './assets/imgs/story1.png', title: 'Favourite' },
    { img: './assets/imgs/story2.png', title: 'Workout' },
    { img: './assets/imgs/post1.png', title: 'Most Played' },
    { img: './assets/imgs/post2.png', title: 'Recently Played' },
    { img: './assets/imgs/post3.png', title: 'Newly Added' },
    { img: './assets/imgs/story1.png', title: 'Favourite' },
    { img: './assets/imgs/story2.png', title: 'Workout' },
  ];
  currentIndex: any = 0;
  //duration: any;
  progress: any;
  totalTime: any;
  curr_playing_file: MediaObject;
  storageDirectory: any;

  is_playing: boolean = false;
  is_in_play: boolean = false;
  is_ready: boolean = false;

  message: any;

  duration: any = -1;
  position: any = 0;

  get_duration_interval: any;
  get_position_interval: any;


  constructor(public service: DataCollectorService, public platform:Platform, private file: File,public loadingCtrl:LoadingController,
    private transfer: FileTransfer,
    private media: Media,
    private datePipe: DatePipe, public toastCtrl:ToastController) {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.storageDirectory = this.file.dataDirectory;
      } else if (this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      } else {
        this.storageDirectory = this.file.cacheDirectory;
      }
    });
    this.getAllMusics();
  }

  ngOnInit() {
  }

  getAllMusics() {
    firebase.database().ref('musics').once('value', (snapshot) => {
      var musics = snapshot.val();
      for (var key in musics) {
        var music = musics[key];
        music.key = key;
        this.allMusics.push(music);
      }

    })
  }

  show(music) {
    this.showFooter = true;
    this.duration=-1;
    if(this.curr_playing_file){
    this.curr_playing_file.stop();
    }
    this.service.currentMusic = music;
    this.is_playing = false;
    this.is_in_play = false;
    this.is_ready = false;
    this.prepareAudioFile();
  }

  prepareAudioFile() {
    let url =this.service.currentMusic.musicUrl;
    this.platform.ready().then(() => {
      this.file
        .resolveDirectoryUrl(this.storageDirectory)
        .then(resolvedDirectory => {
          // inspired by: https://github.com/ionic-team/ionic-native/issues/1711
          console.log('resolved  directory: ' + resolvedDirectory.nativeURL);
          this.file
            .checkFile(resolvedDirectory.nativeURL, this.service.currentMusic.musicName+'.mp3')
            .then(data => {
              if (data == true) {
                // exist
                this.getDurationAndSetToPlay();
              } else {
                // not sure if File plugin will return false. go to download
                console.log('not found!');
                throw { code: 1, message: 'NOT_FOUND_ERR' };
              }
            })
            .catch(async err => {
              console.log('Error occurred while checking local files:');
              console.log(err);
              if (err.code == 1) {
                // not found! download!
                console.log('not found! download!');
                let loadingEl = await this.loadingCtrl.create({
                  message: 'Downloading the song from the web...'
                });
                loadingEl.present();
                const fileTransfer: FileTransferObject = this.transfer.create();
                fileTransfer
                  .download(url, this.storageDirectory + this.service.currentMusic.musicName+'.mp3')
                  .then(entry => {
                    console.log('download complete' + entry.toURL());
                    loadingEl.dismiss();
                    this.getDurationAndSetToPlay();
                  })
                  .catch(err_2 => {
                    console.log('Download error!');
                    loadingEl.dismiss();
                    console.log(err_2);
                  });
              }
            });
        });
    });
  }

  createAudioFile(pathToDirectory, filename): MediaObject {
    if (this.platform.is('ios')) {
      //ios
      return this.media.create(
        pathToDirectory.replace(/^file:\/\//, '') + '/' + filename
      );
    } else {
      // android
      return this.media.create(pathToDirectory + filename);
    }
  }

  getDurationAndSetToPlay() {
    this.curr_playing_file = this.createAudioFile(
      this.storageDirectory,
      this.service.currentMusic.musicName+'.mp3'
    );

    this.curr_playing_file.play();
    this.curr_playing_file.setVolume(0.0); // you don't want users to notice that you are playing the file
    let self = this;
    this.get_duration_interval = setInterval(function() {
      if (self.duration == -1) {
        self.duration = ~~self.curr_playing_file.getDuration(); // make it an integer
      } else {
        self.curr_playing_file.stop();
        self.curr_playing_file.release();
        self.setRecordingToPlay();
        clearInterval(self.get_duration_interval);
      }
    }, 100);
  }

  getAndSetCurrentAudioPosition() {
    let diff = 1;
    let self = this;
    this.get_position_interval = setInterval(function() {
      let last_position = self.position;
      self.curr_playing_file.getCurrentPosition().then(position => {
        if (position >= 0 && position < self.duration) {
          if (Math.abs(last_position - position) >= diff) {
            // set position
            self.curr_playing_file.seekTo(last_position * 1000);
          } else {
            // update position for display
            self.position = position;
          }
        } else if (position >= self.duration) {
          self.stopPlayRecording();
          self.setRecordingToPlay();
        }
      });
    }, 100);
  }

  setRecordingToPlay() {
    this.curr_playing_file = this.createAudioFile(
      this.storageDirectory,
      this.service.currentMusic.musicName+'.mp3'
    );
    this.curr_playing_file.onStatusUpdate.subscribe(status => {
      // 2: playing
      // 3: pause
      // 4: stop
      this.message = status;
      switch (status) {
        case 1:
          this.is_in_play = false;
          break;
        case 2: // 2: playing
          this.is_in_play = true;
          this.is_playing = true;
          break;
        case 3: // 3: pause
          this.is_in_play = true;
          this.is_playing = false;
          break;
        case 4: // 4: stop
        default:
          this.is_in_play = false;
          this.is_playing = false;
          break;
      }
    });
    console.log('audio file set');
    this.message = 'audio file set';
    this.is_ready = true;
    this.getAndSetCurrentAudioPosition();
  }

  playRecording() {
    this.curr_playing_file.play();
    this.toastCtrl
      .create({
        message: `Start playing from ${this.fmtMSS(this.position)}`,
        duration: 2000
      })
      .then(toastEl => toastEl.present());
  }

  pausePlayRecording() {
    this.curr_playing_file.pause();
    this.toastCtrl
      .create({
        message: `Paused at ${this.fmtMSS(this.position)}`,
        duration: 2000
      })
      .then(toastEl => toastEl.present());
  }

  stopPlayRecording() {
    this.curr_playing_file.stop();
    this.curr_playing_file.release();
    clearInterval(this.get_position_interval);
    this.position = 0;
  }

  controlSeconds(action) {
    let step = 15;

    let number = this.position;
    switch (action) {
      case 'back':
        this.position = number < step ? 0.001 : number - step;
        this.toastCtrl
          .create({
            message: `Went back ${step} seconds`,
            duration: 2000
          })
          .then(toastEl => toastEl.present());
        break;
      case 'forward':
        this.position =
          number + step < this.duration ? number + step : this.duration;
        this.toastCtrl
          .create({
            message: `Went forward ${step} seconds`,
            duration: 2000
          })
          .then(toastEl => toastEl.present());
        break;
      default:
        break;
    }
  }

  fmtMSS(s) {
    return this.datePipe.transform(s * 1000, 'mm:ss');

    /** The following has been replaced with Angular DatePipe */
    // // accepts seconds as Number or String. Returns m:ss
    // return (
    //   (s - // take value s and subtract (will try to convert String to Number)
    //     (s %= 60)) / // the new value of s, now holding the remainder of s divided by 60
    //     // (will also try to convert String to Number)
    //     60 + // and divide the resulting Number by 60
    //   // (can never result in a fractional value = no need for rounding)
    //   // to which we concatenate a String (converts the Number to String)
    //   // who's reference is chosen by the conditional operator:
    //   (9 < s // if    seconds is larger than 9
    //     ? ':' // then  we don't need to prepend a zero
    //     : ':0') + // else  we do need to prepend a zero
    //   s
    // ); // and we add Number s to the string (converting it to String as well)
  }


  //oldFlow

  // playAudio(music) {
  //   music.played = true;
  //   this.player.nativeElement.play();
  //   let duration = this.player.nativeElement.duration;
  //   this.totalTime = duration;
  //   this.duration = this.secondsToHms(duration);

  //   this.updateProgress();
  // }



  // secondsToHms(d) {
  //   d = Number(d);
  //   var h = Math.floor(d / 3600);
  //   var m = Math.floor(d % 3600 / 60);
  //   var s = Math.floor(d % 3600 % 60);

  //   var hDisplay = h > 0 ? h + (h == 1 ? " : " : " :") : "";
  //   var mDisplay = m > 0 ? m + (m == 1 ? " : " : " : ") : "";
  //   var sDisplay = s > 0 ? s + (s == 1 ? " " : " ") : "";
  //   return hDisplay + mDisplay + sDisplay;
  // }
  // pauseAudio(music) {
  //   console.log(this.player);
  //   this.player.nativeElement.pause();
  //   this.showFooter = true;
  //   music.played = false;
  //   this.service.currentMusic = music;
  // }


 

  // seek() {
  //   debugger;
  //   this.player.nativeElement.currentTime=this.range.value;
  // }

  // next() {
  //   debugger;
  //   console.log(this.player);
  //   this.player.nativeElement.currentTime=0;
  //   this.currentTime=0;
  //   this.player.nativeElement.pause();
  //   this.allMusics[this.currentIndex].played = false;
  //   this.currentIndex = this.currentIndex + 1;

  //   if (this.currentIndex >= this.allMusics.length - 1) {
  //     this.currentIndex = 0;
  //   }
  
  //   this.player.nativeElement.src = this.allMusics[this.currentIndex].musicUrl;
  //   let duration = this.player.nativeElement.duration;
  //   this.totalTime = duration;
  //   this.duration = this.secondsToHms(duration);
  //   this.allMusics[this.currentIndex].played = true;
  //   this.service.currentMusic = this.allMusics[this.currentIndex];
  //   this.player.nativeElement.play();
  //   console.log(this.player);
  //   debugger;
    
  //   this.updateProgress();


  // }
  // prev() {
  //   this.player.nativeElement.currentTime=0;
  //   this.currentTime=0;
  //   this.player.nativeElement.pause();
  //   this.allMusics[this.currentIndex].played = false;
  //   this.currentIndex = this.currentIndex - 1;
  //   if (this.currentIndex <= 0) {
  //     this.currentIndex = this.allMusics.length - 1;
  //   }
  //   this.player.nativeElement.src = this.allMusics[this.currentIndex].musicUrl;
  //   let duration = this.player.nativeElement.duration;
  //   this.totalTime = duration;
  //   this.duration = this.secondsToHms(duration);
  //   this.allMusics[this.currentIndex].played = true;
  //   this.service.currentMusic = this.allMusics[this.currentIndex];
  //   this.player.nativeElement.play();

    
  //   this.updateProgress();

  // }

  // updateProgress() {
  //   this.currentTime = this.player.nativeElement.currentTime;
  //   setTimeout(() => {
  //     this.updateProgress();
  //   }, 100)

  // }



}
