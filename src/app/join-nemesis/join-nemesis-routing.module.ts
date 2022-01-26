import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinNemesisPage } from './join-nemesis.page';

const routes: Routes = [
  {
    path: '',
    component: JoinNemesisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinNemesisPageRoutingModule {}
