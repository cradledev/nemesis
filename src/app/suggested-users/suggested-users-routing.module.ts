import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuggestedUsersPage } from './suggested-users.page';

const routes: Routes = [
  {
    path: '',
    component: SuggestedUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestedUsersPageRoutingModule {}
