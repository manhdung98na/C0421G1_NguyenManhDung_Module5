import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Showtime} from '../model/showtime';
import {Movie} from '../model/movie';
import {MovieService} from '../service/movie.service';
import {ShowtimeService} from '../service/showtime.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  showtimeEdit: Showtime;
  movies: Movie[];
  editForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.compose([Validators.required, Validators.pattern('CI-[0-9]{4}')])),
    movie: new FormControl(''),
    date: new FormControl('', Validators.compose([Validators.required, this.checkDate])),
    tickets: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    isDeleted: new FormControl(),
  });
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


  constructor(private movieService: MovieService,
              private showtimeService: ShowtimeService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.movieService.getAll().subscribe(next => {
      this.movies = next;
      let id = this.activatedRoute.snapshot.params.id;
      this.showtimeService.findById(id).subscribe(next => {
        this.showtimeEdit = next[0];
        this.editForm.setValue(this.showtimeEdit);
      });
    });
  }

  editShowtime() {
    this.showtimeService.getAllAvailable().subscribe(next => {
      this.showtimeEdit = this.editForm.value;
      this.showtimeService.update(this.showtimeEdit).subscribe(next => {
        this.router.navigateByUrl('/showtimes/list');
        this.notification.showNotification('Success!', 'Done', 'success');
      }, error => {
        console.log(error);
        this.notification.showNotification('Error!', 'Done', 'error');
      });
    }, error => {
      this.notification.showNotification('Error!', 'Done', 'error');
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
