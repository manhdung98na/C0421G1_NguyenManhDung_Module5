import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  firstNumber: number;
  secondNumber: number;
  result: String = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  calculate(s: string) {
    switch (s) {
      case '+':
        this.result = (Number(this.firstNumber) + Number(this.secondNumber)).toString();
        break;
      case '-':
        this.result = (Number(this.firstNumber) - Number(this.secondNumber)).toString();
        break;
      case '*':
        this.result = (Number(this.firstNumber) * Number(this.secondNumber)).toString();
        break;
      case '/':
        if (this.secondNumber != 0) {
          this.result = (Number(this.firstNumber) / Number(this.secondNumber)).toString();
        } else {
          this.result = 'Can not divide by zero';
        }
        break;
    }
  }
}
