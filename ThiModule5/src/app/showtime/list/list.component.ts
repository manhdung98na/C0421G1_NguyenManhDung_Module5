import { Component, OnInit } from '@angular/core';
import {Showtime} from '../model/showtime';
import {Movie} from '../model/movie';
import {FormControl, FormGroup} from '@angular/forms';
import {ShowtimeService} from '../service/showtime.service';
import {MovieService} from '../service/movie.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DetailComponent} from '../detail/detail.component';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-list-showtime',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listShowTime: Showtime[];
  listMovies: Movie[];
  checkedArr: string[] = [];
  searchForm: FormGroup = new FormGroup({
    type: new FormControl(),
    name: new FormControl()
  });
  pageSlice;
  pageSize = 5;

  constructor(private showtimeService: ShowtimeService,
              private movieService: MovieService,
              private router: Router,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.movieService.getAll().subscribe(next => {
      this.listMovies = next;
      this.showtimeService.getAllAvailable().subscribe(next => {
        this.listShowTime = next;
        this.pageSlice = this.listShowTime.slice(0, this.pageSize);
      });
    });
  }

  delete() {
    for (let i in this.checkedArr) {
      this.showtimeService.findById(this.checkedArr[i]).subscribe(next => {
          let showtimeTemp = next[0];
          showtimeTemp.isDeleted = true;
          this.showtimeService.update(showtimeTemp).subscribe(next=> {
            console.log("Xoá " + showtimeTemp.id + " thành công");
          });
        }, error => {
          console.log(error);
        }
      );
    }
    this.checkedArr.splice(0, this.checkedArr.length);
    this.ngOnInit();
  }

  isChecked(value: any, id: string) {
    if (value.currentTarget.checked) {
      this.checkedArr.push(id);
    } else {
      this.checkedArr = this.checkedArr.filter(item => item != id);
    }
  }

  openDialog(id: string) {
    let showtimeDetail: Showtime;
    this.showtimeService.findById(id).subscribe(next => {
      showtimeDetail = next[0];
      let dialogRef = this.dialog.open(DetailComponent, {
        data: showtimeDetail,
        width: '400px'
      });
      dialogRef.afterClosed().subscribe(next => {
        if (next == 'edit') {
          this.router.navigateByUrl('/showtimes/edit/' + id);
        }
      });
    });
  }

  search() {
    let typeSearch = this.searchForm.value.type;
    if (typeSearch == 'Choose movie') {
      typeSearch = null;
    }
    let nameSearch = this.searchForm.value.name;
    if (nameSearch == '') {
      nameSearch = null;
    }
    if (nameSearch == null && typeSearch == null) {
      this.ngOnInit();
    } else {
      this.showtimeService.search(typeSearch, nameSearch).subscribe(next => {
        this.listShowTime = next;
        this.pageSlice = this.listShowTime.slice(0, this.pageSize);
      });
    }
  }

  changePage(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.listShowTime.length) {
      endIndex = this.listShowTime.length;
    }
    this.pageSlice = this.listShowTime.slice(startIndex, endIndex);
  }
}
