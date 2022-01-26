import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-contact',
  templateUrl: './search-contact.page.html',
  styleUrls: ['./search-contact.page.scss'],
})
export class SearchContactPage implements OnInit {

  slides: any = [
    { img: './assets/imgs/user12.png' },
    { img: './assets/imgs/user4.png' },
    { img: './assets/imgs/user5.png' },
    { img: './assets/imgs/story1.png' },
    { img: './assets/imgs/user12.png' },
    { img: './assets/imgs/user4.png' },
    { img: './assets/imgs/user5.png' },
    { img: './assets/imgs/story1.png' },
  ];

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 2
  };
  query:string;
  constructor() { }

  ngOnInit() {
  }

}
