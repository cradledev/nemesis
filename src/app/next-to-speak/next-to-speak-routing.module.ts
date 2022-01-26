import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NextToSpeakPage } from './next-to-speak.page';

const routes: Routes = [
  {
    path: '',
    component: NextToSpeakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NextToSpeakPageRoutingModule {}
