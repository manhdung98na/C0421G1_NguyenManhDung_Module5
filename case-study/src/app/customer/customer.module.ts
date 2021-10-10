import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import {SharedModule} from '../shared/shared.module';
import {CustomerRoutingModule} from './customer-routing.module';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';



@NgModule({
  declarations: [
    CreateCustomerComponent,
    DetailCustomerComponent,
    ListCustomerComponent,
    EditCustomerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule,
  ],
  exports: [
    CustomerRoutingModule,
  ]
})
export class CustomerModule { }
