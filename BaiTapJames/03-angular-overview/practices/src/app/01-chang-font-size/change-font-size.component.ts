import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-change-font-size',
  templateUrl: './change-font-size.component.html',
  styleUrls: ['./change-font-size.component.css']
})
export class ChangeFontSizeComponent implements OnInit {
  fontSize = 14;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeFontSizeValue(fontSize) {
    this.fontSize = fontSize;
  }
}
