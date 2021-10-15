import {Component, OnInit} from '@angular/core';
import {Car} from '../model/car';
import {CarType} from '../model/car-type';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CarTypeService} from '../service/car-type.service';
import {CarService} from '../service/car.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  carCreate: Car;
  carTypes: CarType[];
  places: string[] = ['Đà Nẵng', 'Nghệ An', 'Hà Nội', 'Sài Gòn', 'Vinh'];
  createForm: FormGroup;
  validateMessage = {
    id: [
      {type: 'required', message: 'Input ID!'}
    ],
    type: [
      {type: 'required', message: 'Input type!'},
    ],
    name: [
      {type: 'required', message: 'Nhập tên xe!'},
    ],
    startPlace: [
      {type: 'required', message: 'Chọn nơi đi!'},
    ],
    endPlace: [
      {type: 'required', message: 'Chọn nơi đến!'},
    ],
    phone: [
      {type: 'required', message: 'Nhập số điện thoại!'},
      {type: 'pattern', message: 'Bắt đầu bằng 090|093|097 và có 10 chữ số'}
    ],
    email: [
      {type: 'required', message: 'Nhập email!'},
      {type: 'email', message: 'Nhập đúng định dạng email!'}
    ],
    timeStart: [
      {type: 'required', message: 'Chọn giờ đi!'},
      {type: 'timeError', message: 'Nằm trong khung giờ từ 5:00 tới trước 23:00'},
    ],
    timeEnd: [
      {type: 'required', message: 'Chọn giờ đến!'},
      {type: 'timeError', message: 'Nằm trong khung giờ từ 5:00 tới trước 23:00'},
    ],
  };


  constructor(private carTypeService: CarTypeService,
              private carService: CarService,
              private router: Router,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.carTypeService.getAll().subscribe(next => {
      this.carTypes = next;
      this.createForm = new FormGroup({
        id: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        startPlace: new FormControl(this.places[0], Validators.compose([Validators.required])),
        endPlace: new FormControl(this.places[1], Validators.compose([Validators.required])),
        phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('(090|093|097)[0-9]{7}')])),
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        timeStart: new FormControl('', Validators.compose([Validators.required, this.checkTime])),
        timeEnd: new FormControl('', Validators.compose([Validators.required, this.checkTime])),
      });
    });
  }

  createCar() {
    if (this.createForm.invalid) {
      this.notification.showNotification('Fail to create!', 'OK', 'error');
      return;
    }
    let message = '';
    this.carCreate = this.createForm.value;
    this.carCreate.deleted = false;
    this.carService.add(this.carCreate).subscribe(next => {
      console.log(next);
      this.router.navigateByUrl('/module5/list');
      this.notification.showNotification('Success!', 'Done', 'success');
    }, error => {
      this.notification.showNotification(error.error.text, 'OK', 'error');
      console.log(error.error.text);
    });
  }

  checkTime(check: AbstractControl) {
    const v = check.value;
    let hour = Number.parseInt(v.substring(0, 2));
    let minute = Number.parseInt(v.substring(3, 5));
    if (hour < 5 || hour >= 23) {
      return {timeError: true};
    }
    return null;
  }
}
