import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.page.html',
  styleUrls: ['./image-viewer.page.scss'],
})
export class ImageViewerPage implements OnInit {

  imageUrl: string;

  constructor(
    public navParams: NavParams,
    public modalController: ModalController,
  ) {
    this.imageUrl = navParams.get("image");
  }

  ngOnInit() {

  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
