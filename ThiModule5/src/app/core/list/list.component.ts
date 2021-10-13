import {Component, OnInit} from '@angular/core';
import {Core} from '../model/core';
import {Part} from '../model/part';
import {FormControl, FormGroup} from '@angular/forms';
import {CoreService} from '../service/core.service';
import {PartService} from '../service/part.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DetailComponent} from '../detail/detail.component';
import {PageEvent} from '@angular/material/paginator';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-list-showtime',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listShowTime: Core[];
  listMovies: Part[];
  checkedArr: string[] = [];
  searchForm: FormGroup = new FormGroup({
    type: new FormControl(),
    name: new FormControl('')
  });
  pageSlice;
  pageSize = 5;

  constructor(private showtimeService: CoreService,
              private movieService: PartService,
              private router: Router,
              private dialog: MatDialog,
              private notification: NotificationService) {

  }

  ngOnInit(): void {
    this.movieService.getAll().subscribe(next => {
      this.listMovies = next;
      this.showtimeService.getAllAvailable().subscribe(next => {
        this.listShowTime = next;
        console.log(this.listShowTime);
        this.pageSlice = this.listShowTime.slice(0, this.pageSize);
      });
    });
  }

  delete() {
    for (let i in this.checkedArr) {
      this.showtimeService.findById(this.checkedArr[i]).subscribe(next => {
          let showtimeTemp = next[0];
          showtimeTemp.isDeleted = true;
          this.showtimeService.update(showtimeTemp).subscribe(next => {
            console.log('Xoá ' + showtimeTemp.id + ' thành công');
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
    let showtimeDetail: Core;
    this.showtimeService.findById(id).subscribe(next => {
      showtimeDetail = next[0];
      let dialogRef = this.dialog.open(DetailComponent, {
        data: showtimeDetail,
        width: '400px'
      });
      dialogRef.afterClosed().subscribe(next => {
        if (next == 'edit') {
          this.router.navigateByUrl('/module5/edit/' + id);
        }
      });
    });
  }

  search() {
    let nameSearch = this.searchForm.value.name;
    if (nameSearch == '') {
      this.ngOnInit();
    } else {
      let typeSearch = this.searchForm.value.type;
      if (typeSearch == null || typeSearch == 'null') {
        this.notification.showNotification('Choose search-type!', 'OK', 'error');
        return;
      }
      this.showtimeService.search(typeSearch, nameSearch).subscribe(next => {
        if (next.length == 0) {
          this.notification.showNotification('Not found!', 'OK', 'error');
        } else {
          this.listShowTime = next;
          this.pageSlice = this.listShowTime.slice(0, this.pageSize);
        }
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
