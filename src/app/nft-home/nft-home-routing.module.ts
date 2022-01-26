import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NftHomePage } from './nft-home.page';

const routes: Routes = [
  {
    path: '',
    component: NftHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NftHomePageRoutingModule {}
