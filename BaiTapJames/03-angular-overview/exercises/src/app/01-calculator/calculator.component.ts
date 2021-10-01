import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  result: String = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  calculate(s: string, firstNumber: number, secondNumber: number) {
    switch (s) {
      case '+':
        this.result = (Number(firstNumber) + Number(secondNumber)).toString();
        break;
      case '-':
        this.result = (Number(firstNumber) - Number(secondNumber)).toString();
        break;
      case '*':
        this.result = (Number(firstNumber) * Number(secondNumber)).toString();
        break;
      case '/':
        if (secondNumber != 0) {
          this.result = (Number(firstNumber) / Number(secondNumber)).toString();
        } else {
          this.result = 'Can not divide by zero';
        }
        break;
    }
  }
}
