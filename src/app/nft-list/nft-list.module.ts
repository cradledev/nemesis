import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NftListPageRoutingModule } from './nft-list-routing.module';

import { NftListPage } from './nft-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NftListPageRoutingModule
  ],
  declarations: [NftListPage]
})
export class NftListPageModule {}
