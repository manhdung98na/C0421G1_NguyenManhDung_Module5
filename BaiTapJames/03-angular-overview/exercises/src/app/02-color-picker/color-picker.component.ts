import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {
  color: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  setColor(color){
    this.color = color;
  }
}
