import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.page.html',
  styleUrls: ['./music-player.page.scss'],
})
export class MusicPlayerPage implements OnInit {

  musicList: any = [
    './assets/imgs/music2.png', './assets/imgs/music3.png', './assets/imgs/music4.png', './assets/imgs/music5.png',
  ]

  constructor() { }

  ngOnInit() {
  }

}
