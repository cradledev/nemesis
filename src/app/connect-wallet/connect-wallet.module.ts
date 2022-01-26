import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectWalletPageRoutingModule } from './connect-wallet-routing.module';

import { ConnectWalletPage } from './connect-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectWalletPageRoutingModule
  ],
  declarations: [ConnectWalletPage]
})
export class ConnectWalletPageModule {}
