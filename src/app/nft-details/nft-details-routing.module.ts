import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NftDetailsPage } from './nft-details.page';

const routes: Routes = [
  {
    path: '',
    component: NftDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NftDetailsPageRoutingModule {}
