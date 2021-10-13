import {Component, OnInit} from '@angular/core';
import {Core} from '../model/core';
import {Part} from '../model/part';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {PartService} from '../service/part.service';
import {CoreService} from '../service/core.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  showtimeCreate: Core;
  movies: Part[];
  createForm: FormGroup;
  validateMessage = {
    id: [
      {type: 'required', message: 'Input ID!'},
      {type: 'pattern', message: 'Format: CI-xxxx'}
    ],
    date: [
      {type: 'required', message: 'Input Date!'},
      {type: 'futureDay', message: 'Must be a day in the future!'}
    ],
    tickets: [
      {type: 'required', message: 'Input Tickets!'},
      {type: 'min', message: 'Must be greater than Zero!'}
    ]
  };

  constructor(private movieService: PartService,
              private showtimeService: CoreService,
              private router: Router,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.movieService.getAll().subscribe(next => {
      this.movies = next;
      this.createForm = new FormGroup({
        id: new FormControl('CI-', Validators.compose([Validators.required, Validators.pattern('CI-[0-9]{4}')])),
        movie: new FormControl(this.movies[0]),
        date: new FormControl('', Validators.compose([Validators.required, this.checkDate])),
        tickets: new FormControl('', Validators.compose([Validators.required, Validators.min(1)]))
      });
    });
  }

  createNewShowtime() {
    if (this.createForm.invalid){
      this.notification.showNotification('Fail to create!', 'OK', 'error');
      return;
    }
    let message = '';
    this.showtimeService.getAll().subscribe(next => {
      let checkIdDuplicated = next.find(obj => obj.id == this.createForm.value.id);
      if (checkIdDuplicated) {
        message += 'Duplicate Id!';
        this.notification.showNotification(message, 'OK', 'error');
        return;
      }
      this.showtimeCreate = this.createForm.value;
      this.showtimeCreate.isDeleted = false;
      this.showtimeService.add(this.showtimeCreate).subscribe(next => {
        this.router.navigateByUrl('/module5/list');
        this.notification.showNotification('Success!', 'Done', 'success');
      }, error => {
        this.notification.showNotification('Cant post to Server!', 'OK', 'error');
        console.log(error);
      });
    }, error => {
      this.notification.showNotification('Cant post to Server!', 'OK', 'error');
      console.log(error);
    });
  }

  checkDate(check: AbstractControl) {
    const date = new Date(check.value);
    const nowDate = new Date(Date.now());
    if (date.getFullYear() < nowDate.getFullYear()) {
      return {futureDay: true}
    }
    if (date.getFullYear() == nowDate.getFullYear() && date.getMonth() < nowDate.getMonth()){
      return {futureDay: true}
    }
    if (date.getFullYear() == nowDate.getFullYear() && date.getMonth() == nowDate.getMonth()
    && date.getDate() < nowDate.getDate()){
      return {futureDay: true}
    }
    return null;
  }
}
