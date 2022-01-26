import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTextStatusPage } from './create-text-status.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTextStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTextStatusPageRoutingModule {}
