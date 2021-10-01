import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Bt01RatingBarComponent } from './bt01-rating-bar/bt01-rating-bar.component';
import { TimeComponent } from './bt02-countdown-timer/time/time.component';
import {CountdownTimerComponent} from "./bt02-countdown-timer/countdown-timer/countdown-timer.component";

@NgModule({
  declarations: [
    AppComponent,
    Bt01RatingBarComponent,
    TimeComponent,
    CountdownTimerComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
