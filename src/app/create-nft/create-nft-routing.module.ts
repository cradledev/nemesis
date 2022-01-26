import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNftPage } from './create-nft.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateNftPageRoutingModule {}
