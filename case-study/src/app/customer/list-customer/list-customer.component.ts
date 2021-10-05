import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {CustomerType} from "../customer-type";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  listCustomer: Customer[] | undefined;
  customerType: CustomerType[] = [
    {customerTypeId: 1, customerTypeName: 'Diamond'},
    {customerTypeId: 2, customerTypeName: 'Gold'},
    {customerTypeId: 3, customerTypeName: 'Silver'}
  ];

  constructor() {
    this.listCustomer = [
      {
        customerId: 'KH-0001',
        customerName: 'Mạnh Dũng',
        customerGender: 1,
        customerType: this.customerType[0],
        customerBirthday: '1998-11-11',
        customerEmail: 'mdung@gmail.com',
        customerAddress: 'Nghệ An',
        customerIdCard: '123456789',
        customerPhone: '0901234567',
        isDeleted: false
      },
      {
        customerId: 'KH-0002',
        customerName: 'Bảo Hoàng',
        customerGender: 2,
        customerType: this.customerType[1],
        customerBirthday: '2000-12-10',
        customerEmail: 'bhoang@gmail.com',
        customerAddress: 'Huế',
        customerIdCard: '111444555',
        customerPhone: '0902222222',
        isDeleted: false
      },
      {
        customerId: 'KH-0003',
        customerName: 'Lê Ly',
        customerGender: 0,
        customerType: this.customerType[2],
        customerBirthday: '2002-11-11',
        customerEmail: 'lly@gmail.com',
        customerAddress: 'Đà Nẵng',
        customerIdCard: '124141241',
        customerPhone: '0901111111',
        isDeleted: false
      },
    ];
  }

  ngOnInit(): void {
  }

  customerChosen: Customer|undefined;

  showDetailCustomer(customer: Customer) {
    this.customerChosen = customer;
  }
}
