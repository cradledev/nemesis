import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DebateFeaturePage } from './debate-feature.page';

const routes: Routes = [
  {
    path: '',
    component: DebateFeaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebateFeaturePageRoutingModule {}
