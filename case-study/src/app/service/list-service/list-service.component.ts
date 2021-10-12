import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {Service} from '../model/service';
import {RentType} from '../model/rent-type';
import {ServiceService} from '../service/service.service';
import {RentTypeService} from '../service/rent-type.service';
import {DetailServiceComponent} from '../detail-service/detail-service.component';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {
  listServices: Service[];
  rentType: RentType[];
  checkedArr: string[] = [];
  searchForm: FormGroup = new FormGroup({
    type: new FormControl(),
    name: new FormControl()
  });
  pageSlice;
  pageSize = 5;

  constructor(private serviceService: ServiceService,
              private rentTypeService: RentTypeService,
              private router: Router,
              private dialog: MatDialog,
              private notification: NotificationService) {

  }

  ngOnInit(): void {
    this.rentTypeService.getAll().subscribe(next => {
      this.rentType = next;
      this.serviceService.getAllAvailable().subscribe(next => {
        this.listServices = next;
        this.pageSlice = this.listServices.slice(0, this.pageSize);
      });
    });
  }

  delete() {
    for (let i in this.checkedArr) {
      this.serviceService.findById(this.checkedArr[i]).subscribe(next => {
          let serviceTemp = next[0];
          serviceTemp.isDeleted = true;
          this.serviceService.update(serviceTemp).subscribe(next => {
            console.log('Xoá ' + serviceTemp.id + ' thành công');
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
    console.log(this.checkedArr);
  }

  openDialog(id: string) {
    let serviceDetail: Service;
    this.serviceService.findById(id).subscribe(next => {
      serviceDetail = next[0];
      let dialogRef = this.dialog.open(DetailServiceComponent, {
        data: serviceDetail,
        width: '400px'
      });
      dialogRef.afterClosed().subscribe(next => {
        if (next == 'edit') {
          this.router.navigateByUrl('/services/edit/' + id);
        }
      });
    });
  }

  search() {
    let typeSearch = this.searchForm.value.type;
    if (typeSearch == 'Rent Type') {
      typeSearch = null;
    }
    let nameSearch = this.searchForm.value.name;
    if (nameSearch == '') {
      nameSearch = null;
    }
    if (nameSearch == null && typeSearch == null) {
      this.ngOnInit();
    } else {
      this.serviceService.search(typeSearch, nameSearch).subscribe(next => {
        this.listServices = next;
        if (this.listServices.length == 0){
          this.notification.showNotification("Không tìm thấy kết quả", 'OK', 'error');
        }else {
          this.pageSlice = this.listServices.slice(0, this.pageSize);
        }
      });
    }
  }

  changePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.listServices.length) {
      endIndex = this.listServices.length;
    }
    this.pageSlice = this.listServices.slice(startIndex, endIndex);
  }
}
