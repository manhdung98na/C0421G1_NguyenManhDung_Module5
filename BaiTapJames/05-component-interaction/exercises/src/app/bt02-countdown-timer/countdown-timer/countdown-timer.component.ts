import {Component, OnInit} from '@angular/core';
import {concat} from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  receiveTime($event: any): void{
    console.log($event);
  }
}
