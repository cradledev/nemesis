import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfterSplashPage } from './after-splash.page';

const routes: Routes = [
  {
    path: '',
    component: AfterSplashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfterSplashPageRoutingModule {}
