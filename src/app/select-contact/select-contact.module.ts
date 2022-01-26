import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectContactPageRoutingModule } from './select-contact-routing.module';

import { SelectContactPage } from './select-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectContactPageRoutingModule
  ],
  declarations: [SelectContactPage]
})
export class SelectContactPageModule {}
