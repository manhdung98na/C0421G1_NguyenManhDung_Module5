import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '../../shared/notification.service';
import {DetailCustomerComponent} from '../../customer/detail-customer/detail-customer.component';
import {PageEvent} from '@angular/material/paginator';
import {Employee} from '../model/employee';
import {Division} from '../model/division';
import {Position} from '../model/position';
import {EducationDegree} from '../model/education-degree';
import {EmployeeService} from '../service/employee.service';
import {PositionService} from '../service/position.service';
import {DivisionService} from '../service/division.service';
import {EducationDegreeService} from '../service/education-degree.service';
import {DetailEmployeeComponent} from '../detail-employee/detail-employee.component';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  listEmployees: Employee[];
  positions: Position[];
  divisions: Division[];
  educationDegrees: EducationDegree[];
  checkedArr: string[] = [];
  searchForm: FormGroup = new FormGroup({
    type: new FormControl(),
    name: new FormControl()
  });
  pageSlice;
  pageSize = 5;

  constructor(private employeeService: EmployeeService,
              private positionService: PositionService,
              private divisionService: DivisionService,
              private educationService: EducationDegreeService,
              private router: Router,
              private dialog: MatDialog,
              private notification: NotificationService) {

  }

  ngOnInit(): void {
    this.positionService.getAll().subscribe(next => {
      this.positions = next;
      this.employeeService.getAllAvailable().subscribe(next => {
        this.listEmployees = next;
        this.pageSlice = this.listEmployees.slice(0, this.pageSize);
      });
    });
  }

  delete() {
    for (let i in this.checkedArr) {
      this.employeeService.findById(this.checkedArr[i]).subscribe(next => {
          let customerTemp = next[0];
          customerTemp.isDeleted = true;
          this.employeeService.update(customerTemp).subscribe(next=> {
            console.log("Xoá " + customerTemp.id + " thành công");
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
    let employeeDetail: Employee;
    this.employeeService.findById(id).subscribe(next => {
      employeeDetail = next[0];
      let dialogRef = this.dialog.open(DetailEmployeeComponent, {
        data: employeeDetail,
        width: '400px'
      });
      dialogRef.afterClosed().subscribe(next => {
        if (next == 'edit') {
          this.router.navigateByUrl('/employees/edit/' + id);
        }
      });
    });
  }

  search() {
    let typeSearch = this.searchForm.value.type;
    if (typeSearch == 'Customer Type') {
      typeSearch = null;
    }
    let nameSearch = this.searchForm.value.name;
    if (nameSearch == '') {
      nameSearch = null;
    }
    if (nameSearch == null && typeSearch == null) {
      this.ngOnInit();
    } else {
      this.employeeService.search(typeSearch, nameSearch).subscribe(next => {
        this.listEmployees = next;
        if(this.listEmployees.length == 0){
          this.notification.showNotification("Không tìm thấy kết quả", 'OK', 'error');
        }else {
          this.pageSlice = this.listEmployees.slice(0, this.pageSize);
        }
      });
    }
  }

  changePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.listEmployees.length) {
      endIndex = this.listEmployees.length;
    }
    this.pageSlice = this.listEmployees.slice(startIndex, endIndex);
  }

}
