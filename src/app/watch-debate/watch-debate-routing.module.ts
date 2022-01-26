import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchDebatePage } from './watch-debate.page';

const routes: Routes = [
  {
    path: '',
    component: WatchDebatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchDebatePageRoutingModule {}
