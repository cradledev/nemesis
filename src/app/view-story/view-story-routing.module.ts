import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewStoryPage } from './view-story.page';

const routes: Routes = [
  {
    path: '',
    component: ViewStoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewStoryPageRoutingModule {}
