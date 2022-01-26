import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmContactPageRoutingModule } from './confirm-contact-routing.module';

import { ConfirmContactPage } from './confirm-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmContactPageRoutingModule
  ],
  declarations: [ConfirmContactPage]
})
export class ConfirmContactPageModule {}
