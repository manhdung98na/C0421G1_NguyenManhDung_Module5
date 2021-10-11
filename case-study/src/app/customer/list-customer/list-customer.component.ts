import {Component, OnInit} from '@angular/core';
import {Customer} from '../model/customer';
import {CustomerType} from '../model/customer-type';
import {CustomerService} from '../service/customer.service';
import {CustomerTypeService} from '../service/customer-type.service';
import {MatDialog} from '@angular/material/dialog';
import {DetailCustomerComponent} from '../detail-customer/detail-customer.component';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  listCustomer: Customer[];
  customerType: CustomerType[];
  checkedArr: string[] = [];
  searchForm: FormGroup = new FormGroup({
    type: new FormControl(),
    name: new FormControl()
  });
  pageSlice;
  pageSize = 5;

  constructor(private customerService: CustomerService,
              private customerTypeService: CustomerTypeService,
              private router: Router,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.customerTypeService.getAll().subscribe(next => {
      this.customerType = next;
      this.customerService.getAllAvailable().subscribe(next => {
        this.listCustomer = next;
        this.pageSlice = this.listCustomer.slice(0, this.pageSize);
      });
    });
  }

  delete() {
    for (let i in this.checkedArr) {
      this.customerService.findById(this.checkedArr[i]).subscribe(next => {
          let customerTemp = next[0];
          customerTemp.isDeleted = true;
          this.customerService.update(customerTemp).subscribe(next=> {
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
    let customerDetail: Customer;
    this.customerService.findById(id).subscribe(next => {
      customerDetail = next[0];
      let dialogRef = this.dialog.open(DetailCustomerComponent, {
        data: customerDetail,
        width: '400px'
      });
      dialogRef.afterClosed().subscribe(next => {
        if (next == 'edit') {
          this.router.navigateByUrl('/customers/edit/' + id);
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
      this.customerService.search(typeSearch, nameSearch).subscribe(next => {
        this.listCustomer = next;
        this.pageSlice = this.listCustomer.slice(0, this.pageSize);
      });
    }
  }

  changePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.listCustomer.length) {
      endIndex = this.listCustomer.length;
    }
    this.pageSlice = this.listCustomer.slice(startIndex, endIndex);
  }
}
