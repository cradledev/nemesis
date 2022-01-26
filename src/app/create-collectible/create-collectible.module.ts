import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCollectiblePageRoutingModule } from './create-collectible-routing.module';

import { CreateCollectiblePage } from './create-collectible.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCollectiblePageRoutingModule
  ],
  declarations: [CreateCollectiblePage]
})
export class CreateCollectiblePageModule {}
