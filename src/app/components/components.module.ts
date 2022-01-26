import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NftInfoComponent } from './nft-info/nft-info.component';
import { NftOwnersComponent } from './nft-owners/nft-owners.component';
import { NftHistoryComponent } from './nft-history/nft-history.component';
import { NftBidsComponent } from './nft-bids/nft-bids.component';

@NgModule({
  declarations: [
    NftInfoComponent,
    NftOwnersComponent,
    NftHistoryComponent,
    NftBidsComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NftInfoComponent,
    NftOwnersComponent,
    NftHistoryComponent,
    NftBidsComponent,
  ]
})
export class ComponentsModule { }
