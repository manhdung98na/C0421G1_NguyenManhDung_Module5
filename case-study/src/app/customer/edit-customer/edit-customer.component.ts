import {Component, OnInit} from '@angular/core';
import {Customer} from '../model/customer';
import {CustomerType} from '../model/customer-type';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerTypeService} from '../service/customer-type.service';
import {CustomerService} from '../service/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerEdit: Customer;
  customerType: CustomerType[];
  editForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.compose([Validators.required, Validators.pattern('KH-[0-9]{4}')])),
    name: new FormControl('', Validators.compose([Validators.required])),
    gender: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.compose([Validators.required, this.checkBirthday])),
    idCard: new FormControl('', Validators.compose([Validators.required, Validators.pattern('([0-9]{9}|[0-9]{12})')])),
    phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('(090|091|\\(84\\)\\+90|\\(84\\)\\+91)[0-9]{7}')])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    address: new FormControl('', Validators.required),
    isDeleted: new FormControl(),
  });
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
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.customerTypeService.getAll().subscribe(next => {
      this.customerType = next;
      let id = this.activatedRoute.snapshot.params.id;
      this.customerService.findById(id).subscribe(next => {
        this.customerEdit = next[0];
        this.editForm.setValue(this.customerEdit);
      });
    });
  }

  editCustomer() {
    if (this.editForm.invalid) {
      this.notification.showNotification('Không thành công!', 'OK', 'error');
      return;
    }
    let id = this.editForm.value.id;
    let message = '';
    this.customerService.getAllAvailable().subscribe(next => {
      for (let i in next) {
        if (next[i].id != id && next[i].phone == this.editForm.value.phone) {
          message += 'Duplicate phone!';
          this.notification.showNotification(message, 'OK', 'error');
          return;
        }
        if (next[i].id != id && next[i].email == this.editForm.value.email) {
          message += 'Duplicate email!';
          this.notification.showNotification(message, 'OK', 'error');
          return;
        }
        if (next[i].id != id && next[i].idCard == this.editForm.value.idCard) {
          message += 'Duplicate idCard!';
          this.notification.showNotification(message, 'OK', 'error');
          return;
        }
      }
      this.customerEdit = this.editForm.value;
      this.customerService.update(this.customerEdit).subscribe(next => {
        this.router.navigateByUrl('/customers/list');
        this.notification.showNotification('Success!', 'Done', 'success');
      }, error => {
        this.notification.showNotification('Error!', 'OK', 'error');
        console.log(error);
      });
    }, error => {
      this.notification.showNotification('Error!', 'OK', 'error');
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
