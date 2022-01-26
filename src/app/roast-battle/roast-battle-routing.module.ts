import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoastBattlePage } from './roast-battle.page';

const routes: Routes = [
  {
    path: '',
    component: RoastBattlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoastBattlePageRoutingModule {}
