import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NftListPage } from './nft-list.page';

const routes: Routes = [
  {
    path: '',
    component: NftListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NftListPageRoutingModule {}
