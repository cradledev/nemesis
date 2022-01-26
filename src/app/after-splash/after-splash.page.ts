import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-after-splash',
  templateUrl: './after-splash.page.html',
  styleUrls: ['./after-splash.page.scss'],
})
export class AfterSplashPage implements OnInit {

  constructor(public navCtrl:NavController) { 
    var self = this;
    setTimeout(() => {
      self.navCtrl.navigateRoot(['/login']);
    }, 4000);
  }

  ngOnInit() {
  }

}
