import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgSlideComponent } from './img-slide/img-slide.component';
import { ImgCardComponent } from './img-card/img-card.component';



@NgModule({
  declarations: [
    ImgSlideComponent,
    ImgCardComponent
  ],
  exports: [
    ImgSlideComponent,
    ImgCardComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class ImgSliderModule { }
