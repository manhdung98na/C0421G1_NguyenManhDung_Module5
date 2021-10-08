import {Component, OnInit} from '@angular/core';

let index: number = 0;

@Component({
  selector: 'app-img-slide',
  templateUrl: './img-slide.component.html',
  styleUrls: ['./img-slide.component.css']
})
export class ImgSlideComponent implements OnInit {
  listImage = [
    'https://via.placeholder.com/1280x420/e91e63/ffffff?text=1',
    'https://via.placeholder.com/1280x420/e91e63/ffffff?text=2',
    'https://via.placeholder.com/1280x420/e91e63/ffffff?text=3',
    'https://via.placeholder.com/1280x420/e91e63/ffffff?text=4'
  ];
  img: any;
  constructor() {
  }

  ngOnInit() {
    this.img = this.listImage[index];
  }

  back() {
    if (index > 0) index--;
    this.ngOnInit();
  }

  next() {
    if (index < this.listImage.length - 1) index++;
    this.ngOnInit();
  }
}
