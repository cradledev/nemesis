import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinNemesisPageRoutingModule } from './join-nemesis-routing.module';

import { JoinNemesisPage } from './join-nemesis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinNemesisPageRoutingModule
  ],
  declarations: [JoinNemesisPage]
})
export class JoinNemesisPageModule {}
