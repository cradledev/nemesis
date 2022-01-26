import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewStoryPageRoutingModule } from './view-story-routing.module';

import { ViewStoryPage } from './view-story.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewStoryPageRoutingModule
  ],
  declarations: [ViewStoryPage]
})
export class ViewStoryPageModule {}
