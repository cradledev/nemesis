import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostCommentsPageRoutingModule } from './post-comments-routing.module';
import { PostCommentsPage } from './post-comments.page';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxEmojiPickerModule,
    PostCommentsPageRoutingModule
  ],
  declarations: [PostCommentsPage]
})
export class PostCommentsPageModule {}
