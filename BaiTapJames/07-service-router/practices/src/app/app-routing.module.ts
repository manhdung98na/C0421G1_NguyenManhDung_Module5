import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TimelinesComponent} from "./th01-time-counting/timelines/timelines.component";
import {YoutubePlaylistComponent} from "./th02-playlist-app/youtube-playlist/youtube-playlist.component";
import {YoutubePlayerComponent} from "./th02-playlist-app/youtube-player/youtube-player.component";
import {ProductListComponent} from "./th03-product-management/product/product-list/product-list.component";
import {ProductCreateComponent} from "./th03-product-management/product/product-create/product-create.component";


const routes: Routes = [
  {
    path: "timelines", component: TimelinesComponent
  },
  {
    path: 'youtube',
    component: YoutubePlaylistComponent,
    children: [{
      path: ':id',
      component: YoutubePlayerComponent
    }]
  },
  {
    path: 'product/list',
    component: ProductListComponent
  },
  {
    path: 'product/create',
    component: ProductCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
