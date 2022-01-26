import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchContactPageRoutingModule } from './search-contact-routing.module';

import { SearchContactPage } from './search-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchContactPageRoutingModule
  ],
  declarations: [SearchContactPage]
})
export class SearchContactPageModule {}
