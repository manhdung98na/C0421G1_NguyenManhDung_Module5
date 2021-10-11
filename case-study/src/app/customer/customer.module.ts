import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {DetailCustomerComponent} from './detail-customer/detail-customer.component';
import {ListCustomerComponent} from './list-customer/list-customer.component';
import {EditCustomerComponent} from './edit-customer/edit-customer.component';


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
  ],
  exports: []
})
export class CustomerModule {
}
