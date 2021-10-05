import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Customer} from "../customer";
import {CustomerType} from "../customer-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit, OnChanges {
  @Input() customerDetail: Customer | undefined;
  @Output() customerUpdate = new EventEmitter<Customer>();
  customerType: CustomerType[] = [
    {customerTypeId: 1, customerTypeName: 'Diamond'},
    {customerTypeId: 2, customerTypeName: 'Gold'},
    {customerTypeId: 3, customerTypeName: 'Silver'}
  ];
  disabled: boolean;
  updateForm: FormGroup;

  constructor() {
    this.disabled = true;
    this.updateForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('')])
    })
  }

  ngOnInit(): void {
  }

  changeStatusEditable() {
    this.disabled = !this.disabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.disabled = true;
  }

  updateCustomer() {
    this.customerUpdate.emit(this.form)
  }
}
