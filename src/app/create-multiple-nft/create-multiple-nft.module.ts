import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMultipleNftPageRoutingModule } from './create-multiple-nft-routing.module';

import { CreateMultipleNftPage } from './create-multiple-nft.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMultipleNftPageRoutingModule
  ],
  declarations: [CreateMultipleNftPage]
})
export class CreateMultipleNftPageModule {}
