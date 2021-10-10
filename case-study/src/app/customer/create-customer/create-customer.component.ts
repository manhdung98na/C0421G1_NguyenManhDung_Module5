import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerType} from '../model/customer-type';
import {Customer} from '../model/customer';
import {CustomerTypeService} from '../service/customer-type.service';
import {CustomerService} from '../service/customer.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customerCreate: Customer;
  customerType: CustomerType[];
  createForm: FormGroup;
  validateMessage = {
    id: [
      {type: 'required', message: 'Input ID!'},
      {type: 'pattern', message: 'Format: KH-xxxx'}
    ],
    name: [
      {type: 'required', message: 'Input Name!'},
      {type: 'pattern', message: 'UpperCase each first character!'}
    ],
    gender: [
      {type: 'required', message: 'Input Gender!'}
    ],
    type: [
      {type: 'required', message: 'Input Type!'}
    ],
    birthday: [
      {type: 'required', message: 'Input Birthday!'},
      {type: 'notEnough18', message: 'Age can not be under 18!'},
    ],
    idCard: [
      {type: 'required', message: 'Input Id-card!'},
      {type: 'pattern', message: 'ID card format is 9 or 12 number-characters'}
    ],
    phone: [
      {type: 'required', message: 'Input Phone!'},
      {type: 'pattern', message: '090xxxxxxx|091xxxxxxx|(84)+90xxxxxxx|(84)+91xxxxxxx'}
    ],
    email: [
      {type: 'required', message: 'Input Email!'},
      {type: 'email', message: 'Wrong format email!'}
    ],
    address: [
      {type: 'required', message: 'Input Address!'},
    ]
  };

  constructor(private customerTypeService: CustomerTypeService,
              private customerService: CustomerService,
              private router: Router,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.customerTypeService.getAll().subscribe(next => {
      this.customerType = next;
      this.createForm = new FormGroup({
        id: new FormControl('', Validators.compose([Validators.required, Validators.pattern('KH-[0-9]{4}')])),
        name: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^\p{Lu}\p{Ll}*(\s\p{Lu}\p{Ll}*)*$')])),
        gender: new FormControl(2, Validators.required),
        type: new FormControl(this.customerType[0], Validators.required),
        birthday: new FormControl('', Validators.compose([Validators.required, this.checkBirthday])),
        idCard: new FormControl('', Validators.compose([Validators.required, Validators.pattern('([0-9]{9}|[0-9]{12})')])),
        phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('(090|091|\\(84\\)\\+90|\\(84\\)\\+91)[0-9]{7}')])),
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        address: new FormControl('', Validators.required),
      });
    });
  }

  createNewCustomer() {
    let message = '';
    this.customerService.getAll().subscribe(next => {
      let checkIdDuplicated = next.find(obj => obj.id == this.createForm.value.id);
      let checkPhoneDuplicated = next.find(obj => obj.phone == this.createForm.value.phone);
      let checkEmailDuplicated = next.find(obj => obj.email == this.createForm.value.email);
      let checkIdCardDuplicated = next.find(obj => obj.idCard == this.createForm.value.idCard);
      if (checkIdDuplicated) {
        message += 'Duplicate Id!';
        this.notification.showNotification(message, 'OK', 'error');
        return;
      }
      if (checkPhoneDuplicated) {
        message += 'Duplicate phone!';
        this.notification.showNotification(message, 'OK', 'error');
        return;
      }
      if (checkEmailDuplicated) {
        message += 'Duplicate email!';
        this.notification.showNotification(message, 'OK', 'error');
        return;
      }
      if (checkIdCardDuplicated) {
        message += 'Duplicate id-card!';
        this.notification.showNotification(message, 'OK', 'error');
        return;
      }
      this.customerCreate = this.createForm.value;
      this.customerCreate.isDeleted = false;
      this.customerService.add(this.customerCreate).subscribe(next => {
        this.router.navigateByUrl('/customers/list');
        this.notification.showNotification('Success!', 'Done', 'success');
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  checkBirthday(check: AbstractControl) {
    const birthday = new Date(check.value);
    let age = Date.now() - birthday.getTime() - 86400000;
    const ageDate = new Date(age);
    age = ageDate.getUTCFullYear() - 1970;
    if (age < 18) {
      return {'notEnough18': true};
    }
    return null;
  }
}
