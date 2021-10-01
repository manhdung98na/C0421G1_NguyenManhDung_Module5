import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  time = 10;
  interval: any;
  @Output()
  eventEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  countdown(): void {
    console.log('start');
    clearInterval(this.interval);
    if (this.time <= 0) {
      return;
    }
    this.interval = setInterval(() => {
      this.eventEmitter.emit(--this.time);
      if (this.time === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  stopCountdown(): void {
    console.log('stop');
    clearInterval(this.interval);

  }

  reset(): void {
    console.log('reset');
    this.time = 10;
    clearInterval(this.interval);
  }
}
