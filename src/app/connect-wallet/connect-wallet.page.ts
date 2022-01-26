import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.page.html',
  styleUrls: ['./connect-wallet.page.scss'],
})
export class ConnectWalletPage implements OnInit {
  showModal:boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
