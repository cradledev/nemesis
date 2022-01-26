import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchContactPage } from './search-contact.page';

const routes: Routes = [
  {
    path: '',
    component: SearchContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchContactPageRoutingModule {}
