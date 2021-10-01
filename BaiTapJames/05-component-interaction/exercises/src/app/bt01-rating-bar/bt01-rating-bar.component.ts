import {Component, OnInit} from '@angular/core';
import {IRatingUnit} from '../irating-unit';

@Component({
  selector: 'app-rating-bar',
  templateUrl: './bt01-rating-bar.component.html',
  styleUrls: ['./bt01-rating-bar.component.css']
})
export class Bt01RatingBarComponent implements OnInit, IRatingUnit {
  value: number;
  active: string = 'pink';

  constructor() {
  }

  ngOnInit(): void {
  }

  setValue(x: number) {
    this.value = x;
  }
}
