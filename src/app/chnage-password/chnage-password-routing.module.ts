import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChnagePasswordPage } from './chnage-password.page';

const routes: Routes = [
  {
    path: '',
    component: ChnagePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChnagePasswordPageRoutingModule {}
