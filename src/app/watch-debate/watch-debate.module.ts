import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchDebatePageRoutingModule } from './watch-debate-routing.module';

import { WatchDebatePage } from './watch-debate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchDebatePageRoutingModule
  ],
  declarations: [WatchDebatePage]
})
export class WatchDebatePageModule {}
