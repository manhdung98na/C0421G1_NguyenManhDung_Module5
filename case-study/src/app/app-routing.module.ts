import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCustomerComponent} from './customer/list-customer/list-customer.component';
import {CreateCustomerComponent} from './customer/create-customer/create-customer.component';
import {EditCustomerComponent} from './customer/edit-customer/edit-customer.component';
import {ListServiceComponent} from './service/list-service/list-service.component';
import {CreateServiceComponent} from './service/create-service/create-service.component';
import {EditServiceComponent} from './service/edit-service/edit-service.component';
import {ListEmployeeComponent} from './employee/list-employee/list-employee.component';
import {CreateEmployeeComponent} from './employee/create-employee/create-employee.component';

const routes: Routes = [
  {path: 'customers/list', component: ListCustomerComponent},
  {path: 'customers/create', component: CreateCustomerComponent},
  {path: 'customers/edit/:id', component: EditCustomerComponent},

  {path: 'services/list', component: ListServiceComponent},
  {path: 'services/create', component: CreateServiceComponent},
  {path: 'services/edit/:id', component: EditServiceComponent},

  {path: 'employees/list', component: ListEmployeeComponent},
  {path: 'employees/create', component: CreateEmployeeComponent},
  // {path: 'employees/edit/:id', component: },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
