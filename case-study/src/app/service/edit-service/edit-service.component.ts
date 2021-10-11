import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../shared/notification.service';
import {Service} from '../model/service';
import {RentType} from '../model/rent-type';
import {ServiceService} from '../service/service.service';
import {RentTypeService} from '../service/rent-type.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  serviceEdit: Service;
  rentType: RentType[];
  editForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.compose([Validators.required])),
    area: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    floors: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    maxPeople: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    cost: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    rentType: new FormControl('', Validators.required),
    isAvailable: new FormControl('', Validators.required),
    isDeleted: new FormControl(''),
  });
  validateMessage = {
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
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.rentTypeService.getAll().subscribe(next => {
      this.rentType = next;
      let id = this.activatedRoute.snapshot.params.id;
      this.serviceService.findById(id).subscribe(next => {
        this.serviceEdit = next[0];
        this.editForm.setValue(this.serviceEdit);
      },error => {
        console.log(error);
      });
    });
  }

  editService() {
      this.serviceEdit = this.editForm.value;
      if (this.editForm.value.isAvailable == 'true') {
        this.serviceEdit.isAvailable = true;
      } else if (this.editForm.value.isAvailable == 'false') {
        this.serviceEdit.isAvailable = false;
      } else {
        return;
      }
      this.serviceService.update(this.serviceEdit).subscribe(next => {
        this.router.navigateByUrl('/services/list');
        this.notification.showNotification('Success!', 'Done', 'success');
      }, error => {
        this.notification.showNotification('Error!', 'OK', 'error');
        console.log(error);
      });
  }
}
