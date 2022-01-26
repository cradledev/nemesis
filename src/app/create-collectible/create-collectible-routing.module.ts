import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCollectiblePage } from './create-collectible.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCollectiblePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCollectiblePageRoutingModule {}
