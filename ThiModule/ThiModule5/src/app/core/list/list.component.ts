import {Component, OnInit} from '@angular/core';
import {Car} from '../model/car';
import {CarType} from '../model/car-type';
import {FormControl, FormGroup} from '@angular/forms';
import {CarService} from '../service/car.service';
import {CarTypeService} from '../service/car-type.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DetailComponent} from '../detail/detail.component';
import {PageEvent} from '@angular/material/paginator';
import {NotificationService} from '../../shared/notification.service';
import {log} from 'util';

@Component({
  selector: 'app-list-showtime',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listCars: Car[];
  listCarTypes: CarType[];
  checkedArr: string[] = [];
  searchForm: FormGroup = new FormGroup({
    type: new FormControl(),
    name: new FormControl('')
  });
  pageSlice;
  pageSize = 5;

  constructor(private carService: CarService,
              private carTypeService: CarTypeService,
              private router: Router,
              private dialog: MatDialog,
              private notification: NotificationService) {

  }

  ngOnInit(): void {
    this.carTypeService.getAll().subscribe(next => {
      this.listCarTypes = next;
      this.carService.getAll().subscribe(next => {
        this.listCars = next;
        this.pageSlice = this.listCars.slice(0, this.pageSize);
      });
    });
  }

  delete() {
    for (let i in this.checkedArr) {
      this.carService.delete(Number.parseInt(this.checkedArr[i])).subscribe(() => {
        if (Number.parseInt(i) == this.checkedArr.length - 1){
          this.checkedArr.splice(0, this.checkedArr.length);
          this.notification.showNotification('Xoá thành công!', 'Done', 'success');
          this.ngOnInit();
        }
      });
    }
  }

  isChecked(value: any, id: string) {
    if (value.currentTarget.checked) {
      this.checkedArr.push(id);
    } else {
      this.checkedArr = this.checkedArr.filter(item => item != id);
    }
  }

  openDialog(id: number) {
    let carDetail: Car;
    this.carService.findById(id).subscribe(next => {
      carDetail = next;
      let dialogRef = this.dialog.open(DetailComponent, {
        data: carDetail,
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
      this.carService.search(typeSearch, nameSearch).subscribe(next => {
        if (next == null || next.length == 0) {
          this.notification.showNotification('Not found!', 'OK', 'error');
        } else {
          this.listCars = next;
          this.pageSlice = this.listCars.slice(0, this.pageSize);
        }
      }, error => console.log(error));
    }
  }

  changePage(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.listCars.length) {
      endIndex = this.listCars.length;
    }
    this.pageSlice = this.listCars.slice(startIndex, endIndex);
  }
}
