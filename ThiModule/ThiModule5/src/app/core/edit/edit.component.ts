import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Car} from '../model/car';
import {CarType} from '../model/car-type';
import {CarTypeService} from '../service/car-type.service';
import {CarService} from '../service/car.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  carEdit: Car;
  types: CarType[];
  places: string[] = ['Đà Nẵng', 'Nghệ An', 'Hà Nội', 'Sài Gòn', 'Vinh'];
  editForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    startPlace: new FormControl('', Validators.compose([Validators.required])),
    endPlace: new FormControl('', Validators.compose([Validators.required])),
    phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('(090|093|097)[0-9]{7}')])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    timeStart: new FormControl('', Validators.compose([Validators.required, this.checkTime])),
    timeEnd: new FormControl('', Validators.compose([Validators.required, this.checkTime])),
    deleted: new FormControl(),
  });
  validateMessage = {
    type: [
      {type: 'required', message: 'Input ID!'},
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
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.carTypeService.getAll().subscribe(next => {
      this.types = next;
      let id = this.activatedRoute.snapshot.params.id;
      this.carService.findById(id).subscribe(next => {
        this.carEdit = next;
        this.editForm.setValue(this.carEdit);
      });
    });
  }

  editCar() {
    if (this.editForm.invalid) {
      this.notification.showNotification('Lỗi! Chỉnh sửa thất bại', 'OK', 'error');
      return;
    }
    if (this.editForm.value.startPlace == this.editForm.value.endPlace) {
      this.notification.showNotification('Nơi đến và nơi đi ko được trùng nhau!', 'OK', 'error');
      return;
    }
    this.carEdit = this.editForm.value;
    let id = this.activatedRoute.snapshot.params.id;
    this.carService.update(id, this.carEdit).subscribe(next => {
        this.router.navigateByUrl('/module5/list');
        this.notification.showNotification('Success!', 'Done', 'success');
      },
      error => {
        console.log(error);
        this.notification.showNotification(error.error.text, 'Done', 'error');
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
