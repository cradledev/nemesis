import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DebateFeaturePageRoutingModule } from './debate-feature-routing.module';

import { DebateFeaturePage } from './debate-feature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DebateFeaturePageRoutingModule
  ],
  declarations: [DebateFeaturePage]
})
export class DebateFeaturePageModule {}
