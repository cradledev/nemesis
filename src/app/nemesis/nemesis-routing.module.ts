import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NemesisPage } from './nemesis.page';

const routes: Routes = [
  {
    path: '',
    component: NemesisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NemesisPageRoutingModule {}
