import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../../shared/notification.service';
import {Service} from '../model/service';
import {RentType} from '../model/rent-type';
import {RentTypeService} from '../service/rent-type.service';
import {ServiceService} from '../service/service.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {
  serviceCreate: Service;
  rentType: RentType[];
  createForm: FormGroup;
  validateMessage = {
    id: [
      {type: 'required', message: 'Input ID!'},
      {type: 'pattern', message: 'Format: DV-xxxx'}
    ],
    name: [
      {type: 'required', message: 'Input Name!'},
      {type: 'pattern', message: 'UpperCase each first character!'}
    ],
    area: [
      {type: 'required', message: 'Input Area!'},
      {type: 'min', message: 'Must be greater than Zero!'}
    ],
    floors: [
      {type: 'required', message: 'Input number of floors!'},
      {type: 'min', message: 'Must be greater than Zero!'}
    ],
    maxPeople: [
      {type: 'required', message: 'Input Max-people!'},
      {type: 'min', message: 'Must be greater than Zero!'}
    ],
    cost: [
      {type: 'required', message: 'Input Cost!'},
      {type: 'min', message: 'Must be greater than Zero!'}
    ],
    isAvailable: [
      {type: 'required', message: 'Input Status!'},
    ]
  };

  constructor(private rentTypeService: RentTypeService,
              private serviceService: ServiceService,
              private router: Router,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.rentTypeService.getAll().subscribe(next => {
      this.rentType = next;
      this.createForm = new FormGroup({
        id: new FormControl('', Validators.compose([Validators.required, Validators.pattern('DV-[0-9]{4}')])),
        name: new FormControl('', Validators.compose([Validators.required])),
        area: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
        floors: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
        maxPeople: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
        cost: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
        rentType: new FormControl(this.rentType[0]),
        isAvailable: new FormControl('', Validators.required),
      });
    });
  }

  createNewService() {
    if (this.createForm.invalid) {
      this.notification.showNotification('Không thành công!', 'OK', 'error');
      return;
    }
    let message = '';
    this.serviceService.getAll().subscribe(next => {
      let checkIdDuplicated = next.find(obj => obj.id == this.createForm.value.id);
      if (checkIdDuplicated) {
        message += 'Duplicate Id!';
        this.notification.showNotification(message, 'OK', 'error');
        return;
      }
      this.serviceCreate = this.createForm.value;
      if (this.createForm.value.isAvailable == 'true') {
        this.serviceCreate.isAvailable = true;
      } else if (this.createForm.value.isAvailable == 'false') {
        this.serviceCreate.isAvailable = false;
      } else {
        return;
      }
      this.serviceCreate.isDeleted = false;
      this.serviceService.add(this.serviceCreate).subscribe(
        next => {
          this.router.navigateByUrl('/services/list');
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
}
