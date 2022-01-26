import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSingleNftPageRoutingModule } from './create-single-nft-routing.module';

import { CreateSingleNftPage } from './create-single-nft.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSingleNftPageRoutingModule
  ],
  declarations: [CreateSingleNftPage]
})
export class CreateSingleNftPageModule {}
