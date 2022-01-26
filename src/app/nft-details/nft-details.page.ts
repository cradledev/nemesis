import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nft-details',
  templateUrl: './nft-details.page.html',
  styleUrls: ['./nft-details.page.scss']
})
export class NftDetailsPage implements OnInit {
  public optBtns: any = ['Info','History', 'Bids'];
  public activeTab: string = "Info";
  constructor() { }

  ngOnInit() {
  }

}