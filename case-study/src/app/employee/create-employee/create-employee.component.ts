import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../../shared/notification.service';
import {Employee} from '../model/employee';
import {Division} from '../model/division';
import {Position} from '../model/position';
import {EducationDegree} from '../model/education-degree';
import {PositionService} from '../service/position.service';
import {EmployeeService} from '../service/employee.service';
import {DivisionService} from '../service/division.service';
import {EducationDegreeService} from '../service/education-degree.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeCreate: Employee;
  positions: Position[];
  divisions: Division[];
  educationDegrees: EducationDegree[];
  createForm: FormGroup;
  validateMessage = {
    id: [
      {type: 'required', message: 'Input ID!'},
      {type: 'pattern', message: 'Format: NV-xxxx'}
    ],
    name: [
      {type: 'required', message: 'Input Name!'},
      {type: 'pattern', message: 'UpperCase each first character!'}
    ],
    birthday: [
      {type: 'required', message: 'Input Birthday!'},
      // {type: 'notEnough18', message: 'Age can not be under 18!'},
    ],
    idCard: [
      {type: 'required', message: 'Input Id-card!'},
      {type: 'pattern', message: 'ID card format is 9 or 12 number-characters'}
    ],
    salary: [
      {type: 'required', message: 'Input Salary!'},
      {type: 'min', message: 'Must be a number greater than Zero!'}
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

  constructor(private positionService: PositionService,
              private divisionService: DivisionService,
              private educationService: EducationDegreeService,
              private employeeService: EmployeeService,
              private router: Router,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.positionService.getAll().subscribe(next => {
      this.positions = next;
      this.divisionService.getAll().subscribe(n => {
        this.divisions = n;
        this.educationService.getAll().subscribe(n => {
          this.educationDegrees = n;
          this.createForm = new FormGroup({
            id: new FormControl('NV-', Validators.compose([Validators.required, Validators.pattern('NV-[0-9]{4}')])),
            name: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[A-Z][a-z]*(\s[A-Z][a-z]*)*$')])),
            division: new FormControl(this.divisions[0]),
            position: new FormControl(this.positions[0]),
            educationDegree: new FormControl(this.educationDegrees[0]),
            birthday: new FormControl('', Validators.required),
            idCard: new FormControl('', Validators.compose([Validators.required, Validators.pattern('([0-9]{9}|[0-9]{12})')])),
            salary: new FormControl('', [Validators.required, Validators.min(1)]),
            phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('(090|091|\\(84\\)\\+90|\\(84\\)\\+91)[0-9]{7}')])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            address: new FormControl('', Validators.required)
          });
        })
      })
    });
  }

  createNewEmployee() {
    console.log(this.createForm.value);
    // let message = '';
    // this.employeeService.getAll().subscribe(next => {
    //   let checkIdDuplicated = next.find(obj => obj.id == this.createForm.value.id);
    //   let checkPhoneDuplicated = next.find(obj => obj.phone == this.createForm.value.phone);
    //   let checkEmailDuplicated = next.find(obj => obj.email == this.createForm.value.email);
    //   let checkIdCardDuplicated = next.find(obj => obj.idCard == this.createForm.value.idCard);
    //   if (checkIdDuplicated) {
    //     message += 'Duplicate Id!';
    //     this.notification.showNotification(message, 'OK', 'error');
    //     return;
    //   }
    //   if (checkPhoneDuplicated) {
    //     message += 'Duplicate phone!';
    //     this.notification.showNotification(message, 'OK', 'error');
    //     return;
    //   }
    //   if (checkEmailDuplicated) {
    //     message += 'Duplicate email!';
    //     this.notification.showNotification(message, 'OK', 'error');
    //     return;
    //   }
    //   if (checkIdCardDuplicated) {
    //     message += 'Duplicate id-card!';
    //     this.notification.showNotification(message, 'OK', 'error');
    //     return;
    //   }
    //   this.employeeCreate = this.createForm.value;
    //   this.employeeCreate.isDeleted = false;
    //   this.employeeService.add(this.employeeCreate).subscribe(next => {
    //     this.router.navigateByUrl('/customers/list');
    //     this.notification.showNotification('Success!', 'Done', 'success');
    //   }, error => {
    //     console.log(error);
    //   });
    // }, error => {
    //   console.log(error);
    // });
  }
}
