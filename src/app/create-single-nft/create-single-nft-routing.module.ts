import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSingleNftPage } from './create-single-nft.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSingleNftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSingleNftPageRoutingModule {}
