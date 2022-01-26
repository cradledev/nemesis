import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsReplyPageRoutingModule } from './comments-reply-routing.module';

import { CommentsReplyPage } from './comments-reply.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsReplyPageRoutingModule
  ],
  declarations: [CommentsReplyPage]
})
export class CommentsReplyPageModule {}
