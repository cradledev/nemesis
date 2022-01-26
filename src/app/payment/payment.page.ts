import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  street:String;
  state:String;
  zip:String;
  country:String;
  email:String;
  cardName:String;
  cardNumber:String;
  month:String;
  year:String;
  cvv:String;
  checked:Boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
