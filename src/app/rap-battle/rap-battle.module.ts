import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RapBattlePageRoutingModule } from './rap-battle-routing.module';

import { RapBattlePage } from './rap-battle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RapBattlePageRoutingModule
  ],
  declarations: [RapBattlePage]
})
export class RapBattlePageModule {}
