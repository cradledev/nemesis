import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmContactPage } from './confirm-contact.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmContactPageRoutingModule {}
