import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'after-splash',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'search-contact',
    loadChildren: () => import('./search-contact/search-contact.module').then(m => m.SearchContactPageModule)
  },
  {
    path: 'join-nemesis',
    loadChildren: () => import('./join-nemesis/join-nemesis.module').then(m => m.JoinNemesisPageModule)
  },
  {
    path: 'rap-battle',
    loadChildren: () => import('./rap-battle/rap-battle.module').then(m => m.RapBattlePageModule)
  },
  {
    path: 'roast-battle',
    loadChildren: () => import('./roast-battle/roast-battle.module').then(m => m.RoastBattlePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'others-profile/:id',
    loadChildren: () => import('./others-profile/others-profile.module').then(m => m.OthersProfilePageModule)
  },
  {
    path: 'music-player',
    loadChildren: () => import('./music-player/music-player.module').then(m => m.MusicPlayerPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'chat-screen/:id',
    loadChildren: () => import('./chat-screen/chat-screen.module').then( m => m.ChatScreenPageModule)
  },
  {
    path: 'advance-search',
    loadChildren: () => import('./advance-search/advance-search.module').then( m => m.AdvanceSearchPageModule)
  },
  {
    path: 'select-contact',
    loadChildren: () => import('./select-contact/select-contact.module').then( m => m.SelectContactPageModule)
  },
  {
    path: 'confirm-contact',
    loadChildren: () => import('./confirm-contact/confirm-contact.module').then( m => m.ConfirmContactPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'chnage-password',
    loadChildren: () => import('./chnage-password/chnage-password.module').then( m => m.ChnagePasswordPageModule)
  },
  {
    path: 'blocked-list',
    loadChildren: () => import('./blocked-list/blocked-list.module').then( m => m.BlockedListPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'terms-services',
    loadChildren: () => import('./terms-services/terms-services.module').then( m => m.TermsServicesPageModule)
  },
  {
    path: 'image-viewer',
    loadChildren: () => import('./image-viewer/image-viewer.module').then( m => m.ImageViewerPageModule)
  },
  {
    path: 'post-comments',
    loadChildren: () => import('./post-comments/post-comments.module').then( m => m.PostCommentsPageModule)
  },
  {
    path: 'view-story',
    loadChildren: () => import('./view-story/view-story.module').then( m => m.ViewStoryPageModule)
  },
  {
    path: 'nemesis',
    loadChildren: () => import('./nemesis/nemesis.module').then( m => m.NemesisPageModule)
  },
  {
    path: 'comments-reply',
    loadChildren: () => import('./comments-reply/comments-reply.module').then( m => m.CommentsReplyPageModule)
  },
  {
    path: 'after-splash',
    loadChildren: () => import('./after-splash/after-splash.module').then( m => m.AfterSplashPageModule)
  },
  {
    path: 'suggested-users',
    loadChildren: () => import('./suggested-users/suggested-users.module').then( m => m.SuggestedUsersPageModule)
  },
  {
    path: 'gif',
    loadChildren: () => import('./gif/gif.module').then( m => m.GifPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'next-to-speak',
    loadChildren: () => import('./next-to-speak/next-to-speak.module').then( m => m.NextToSpeakPageModule)
  },
  {
    path: 'debate-feature',
    loadChildren: () => import('./debate-feature/debate-feature.module').then( m => m.DebateFeaturePageModule)
  },
  {
    path: 'watch-debate',
    loadChildren: () => import('./watch-debate/watch-debate.module').then( m => m.WatchDebatePageModule)
  },
  {
    path: 'promotion',
    loadChildren: () => import('./promotion/promotion.module').then( m => m.PromotionPageModule)
  },
  {
    path: 'create-promotion',
    loadChildren: () => import('./create-promotion/create-promotion.module').then( m => m.CreatePromotionPageModule)
  },
  {
    path: 'nft-home',
    loadChildren: () => import('./nft-home/nft-home.module').then( m => m.NftHomePageModule)
  },
  {
    path: 'nft-list',
    loadChildren: () => import('./nft-list/nft-list.module').then( m => m.NftListPageModule)
  },
  {
    path: 'create-nft',
    loadChildren: () => import('./create-nft/create-nft.module').then( m => m.CreateNftPageModule)
  },
  {
    path: 'create-single-nft',
    loadChildren: () => import('./create-single-nft/create-single-nft.module').then( m => m.CreateSingleNftPageModule)
  },
  {
    path: 'create-multiple-nft',
    loadChildren: () => import('./create-multiple-nft/create-multiple-nft.module').then( m => m.CreateMultipleNftPageModule)
  },
  {
    path: 'connect-wallet',
    loadChildren: () => import('./connect-wallet/connect-wallet.module').then( m => m.ConnectWalletPageModule)
  },
  {
    path: 'nft-details',
    loadChildren: () => import('./nft-details/nft-details.module').then( m => m.NftDetailsPageModule)
  },
  {
    path: 'create-text-status',
    loadChildren: () => import('./create-text-status/create-text-status.module').then( m => m.CreateTextStatusPageModule)
  },
  {
    path: 'create-collectible',
    loadChildren: () => import('./create-collectible/create-collectible.module').then( m => m.CreateCollectiblePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
