import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentsReplyPage } from './comments-reply.page';

const routes: Routes = [
  {
    path: '',
    component: CommentsReplyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentsReplyPageRoutingModule {}
