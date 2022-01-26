import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nft-home',
  templateUrl: './nft-home.page.html',
  styleUrls: ['./nft-home.page.scss'],
})
export class NftHomePage implements OnInit {
  activeFilter: string = 'NEW';
  filters = ['NFT ART','NFT PHOTOS'];
  constructor() { }

  ngOnInit() {
  }

}
