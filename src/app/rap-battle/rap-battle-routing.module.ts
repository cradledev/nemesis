import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RapBattlePage } from './rap-battle.page';

const routes: Routes = [
  {
    path: '',
    component: RapBattlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RapBattlePageRoutingModule {}
