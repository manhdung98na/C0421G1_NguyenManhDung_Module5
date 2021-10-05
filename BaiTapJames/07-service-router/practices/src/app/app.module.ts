import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimelinesComponent } from './th01-time-counting/timelines/timelines.component';
import { YoutubePlaylistComponent } from './th02-playlist-app/youtube-playlist/youtube-playlist.component';
import { YoutubePlayerComponent } from './th02-playlist-app/youtube-player/youtube-player.component';
import { ProductListComponent } from './th03-product-management/product/product-list/product-list.component';
import { ProductCreateComponent } from './th03-product-management/product/product-create/product-create.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TimelinesComponent,
    YoutubePlaylistComponent,
    YoutubePlayerComponent,
    ProductListComponent,
    ProductCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
