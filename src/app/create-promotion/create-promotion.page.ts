import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.page.html',
  styleUrls: ['./create-promotion.page.scss'],
})
export class CreatePromotionPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 3.1
  };
  constructor() { }

  ngOnInit() {
  }

}
