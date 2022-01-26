import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTextStatusPageRoutingModule } from './create-text-status-routing.module';

import { CreateTextStatusPage } from './create-text-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTextStatusPageRoutingModule
  ],
  declarations: [CreateTextStatusPage]
})
export class CreateTextStatusPageModule {}
