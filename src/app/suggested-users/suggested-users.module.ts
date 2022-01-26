import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestedUsersPageRoutingModule } from './suggested-users-routing.module';

import { SuggestedUsersPage } from './suggested-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuggestedUsersPageRoutingModule
  ],
  declarations: [SuggestedUsersPage]
})
export class SuggestedUsersPageModule {}
