import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Contacts } from '@ionic-native/contacts';
// import { SelectContactPage } from './select-contact/select-contact.page';
// import { ConfirmContactPage } from './confirm-contact/confirm-contact.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import { Crop } from '@ionic-native/crop/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { File } from '@ionic-native/file/ngx';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { HttpClientModule } from '@angular/common/http';
import {
  FileTransfer,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import { Media } from '@ionic-native/media/ngx';
import { DatePipe } from '@angular/common';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

var firebaseConfig = {
  apiKey: "AIzaSyA5OhUVfXueVXKzHkswdZK_87f_m_b8h9A",
  authDomain: "nemesis-d3a6e.firebaseapp.com",
  databaseURL: "https://nemesis-d3a6e.firebaseio.com",
  projectId: "nemesis-d3a6e",
  storageBucket: "nemesis-d3a6e.appspot.com",
  messagingSenderId: "35811702656",
  appId: "1:35811702656:web:708f9c326b38a0be06b365",
  measurementId: "G-LXE81Q5GZN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


@NgModule({
  declarations: [
    AppComponent,
    // SelectContactPage,
    // ConfirmContactPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxEmojiPickerModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Contacts,
    SocialSharing,
    Crop,
    Camera,
    LocalNotifications,
    MediaCapture,
    Media,
    File,
    DatePipe,
    FileTransfer,
    FileTransferObject,
    DocumentViewer,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
