import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../account";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() accounts: Account[];
  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    });
  }

  ngOnInit(): void {

  }

  login() {
    for (let i in this.accounts){
      if (this.accounts[i].email === this.loginForm.value.email
        && this.accounts[i].password === this.loginForm.value.password){
        alert("ĐĂNG NHẬP THÀNH CÔNG");
        return;
      }
    }
    alert("ĐĂNG NHẬP THẤT BẠI");
  }
}
