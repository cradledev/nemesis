import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NftHomePageRoutingModule } from './nft-home-routing.module';

import { NftHomePage } from './nft-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NftHomePageRoutingModule
  ],
  declarations: [NftHomePage]
})
export class NftHomePageModule {}
