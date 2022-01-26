import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChnagePasswordPageRoutingModule } from './chnage-password-routing.module';

import { ChnagePasswordPage } from './chnage-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChnagePasswordPageRoutingModule
  ],
  declarations: [ChnagePasswordPage]
})
export class ChnagePasswordPageModule {}
