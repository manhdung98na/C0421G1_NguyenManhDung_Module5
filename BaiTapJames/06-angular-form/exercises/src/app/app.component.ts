import { Component } from '@angular/core';
import {Account} from "./account";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exercises';
  accounts: Account[] = [];

  getNewAccount($event: Account) {
    this.accounts.push($event);
    alert("ĐĂNG KÝ THÀNH CÔNG");
  }
}
