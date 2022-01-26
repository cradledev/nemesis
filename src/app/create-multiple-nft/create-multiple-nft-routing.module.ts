import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMultipleNftPage } from './create-multiple-nft.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMultipleNftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMultipleNftPageRoutingModule {}
