import { Component, OnInit } from '@angular/core';
import {Pet} from '../pet';

@Component({
  selector: 'app-show-pet-info',
  templateUrl: './show-pet-info.component.html',
  styleUrls: ['./show-pet-info.component.css']
})
export class ShowPetInfoComponent implements OnInit {
  pet: Pet = {
    name: 'puppie',
    image: 'http://yourdost-blog-images.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2016/01/03165939/Dogs.jpg'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
