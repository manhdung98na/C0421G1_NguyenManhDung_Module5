import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListCustomerComponent} from './customer/list-customer/list-customer.component';
import {CreateCustomerComponent} from './customer/create-customer/create-customer.component';
import {DetailCustomerComponent} from './customer/detail-customer/detail-customer.component';
import {EditCustomerComponent} from './customer/edit-customer/edit-customer.component';


const routes: Routes = [
  {path: 'customers/list', component: ListCustomerComponent,
    // loadChildren:() => import('./customer/customer.module').then(module => module.CustomerModule)
  },
  {path: 'customers/create', component: CreateCustomerComponent},
  {path: 'customers/detail/:id', component: DetailCustomerComponent},
  {path: 'customers/edit/:id', component: EditCustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
