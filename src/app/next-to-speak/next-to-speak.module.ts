import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NextToSpeakPageRoutingModule } from './next-to-speak-routing.module';

import { NextToSpeakPage } from './next-to-speak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NextToSpeakPageRoutingModule
  ],
  declarations: [NextToSpeakPage]
})
export class NextToSpeakPageModule {}
