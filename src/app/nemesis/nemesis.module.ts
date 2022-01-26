import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NemesisPageRoutingModule } from './nemesis-routing.module';

import { NemesisPage } from './nemesis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NemesisPageRoutingModule
  ],
  declarations: [NemesisPage]
})
export class NemesisPageModule {}
