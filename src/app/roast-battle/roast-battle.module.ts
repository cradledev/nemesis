import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoastBattlePageRoutingModule } from './roast-battle-routing.module';

import { RoastBattlePage } from './roast-battle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoastBattlePageRoutingModule
  ],
  declarations: [RoastBattlePage]
})
export class RoastBattlePageModule {}
