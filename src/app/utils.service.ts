import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  public loader: any;

  constructor(public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }

  async presentLoading(message?) {
    if (!this.loader) {
      this.loader = await this.loadingCtrl.create({
        message: message || ""
      });
      await this.loader.present();
      const { role, data } = await this.loader.onDidDismiss();
    }
  }

  stopLoading() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }

  async createToast(mess) {
    const toast = await this.toastCtrl.create({
      message: mess,
      duration: 3000
    });
    toast.present();
  }
}
