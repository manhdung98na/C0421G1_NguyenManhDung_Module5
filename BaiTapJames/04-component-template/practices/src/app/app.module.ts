import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HackerNewsComponent } from './01-hacker-news/hacker-news/hacker-news.component';
import { FormsModule } from '@angular/forms';
import { LikeComponent } from './01-hacker-news/like/like.component';

@NgModule({
  declarations: [
    AppComponent,
    HackerNewsComponent,
    LikeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
