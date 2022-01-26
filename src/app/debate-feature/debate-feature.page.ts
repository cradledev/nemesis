import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-debate-feature',
  templateUrl: './debate-feature.page.html',
  styleUrls: ['./debate-feature.page.scss'],
})
export class DebateFeaturePage implements OnInit {

  constructor(public actionSheetCtrl:ActionSheetController) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Add to story',
        handler: () => {

        }
      }, {
        text: 'Forward to friend',
        handler: () => {

        }
      }, {
        text: 'Unfollow',
        handler: () => {

        }
      }, {
        text: 'Block',
        handler: () => {

        }
      }, {
        text: 'Report',
        handler: () => {

        }
      }, {
        text: 'Turn on post notifications',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();
  }


}
