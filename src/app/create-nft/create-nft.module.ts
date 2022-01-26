import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateNftPageRoutingModule } from './create-nft-routing.module';

import { CreateNftPage } from './create-nft.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateNftPageRoutingModule
  ],
  declarations: [CreateNftPage]
})
export class CreateNftPageModule {}
