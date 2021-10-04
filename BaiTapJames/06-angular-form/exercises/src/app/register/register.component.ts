import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../account";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output('accountRegister') accountsAfterRegister = new EventEmitter<Account>();
  registerForm: FormGroup;

  constructor() {
    this.registerForm = new FormGroup({
      email: new FormControl('',
        [Validators.required, Validators.email]),
      passwordGroup: new FormGroup({
        password: new FormControl('',),
        confirmPassword: new FormControl(''),
      }, this.comparePassword),
      country: new FormControl('', Validators.required),
      age: new FormControl('',
        [Validators.required, Validators.min(18)]),
      gender: new FormControl('', Validators.required),
      phone: new FormControl('',
        [Validators.required, Validators.pattern('[+]84[0-9]{9,10}')])
    });
  }

  ngOnInit(): void {
  }

  comparePassword(c: AbstractControl): any {
    const v = c.value;
    if (v.password.length == 0) return {required: true};
    if (v.password.length < 6) return {minLength: true};
    return (v.password === v.confirmPassword) ? null : {passnotmatch: true};
  }

  saveInfo() {
    this.accountsAfterRegister.emit({
      email: this.registerForm.value.email,
      age: this.registerForm.value.age,
      country: this.registerForm.value.country,
      gender: this.registerForm.value.gender,
      password: this.registerForm.get('passwordGroup').value.password,
      phone: this.registerForm.value.phone
    });
  }

}
