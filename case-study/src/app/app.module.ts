import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './layout/footer/footer.component';
import {HeaderComponent} from "./layout/header/header.component";
import {ListCustomerComponent} from './customer/list-customer/list-customer.component';
import {CreateCustomerComponent} from './customer/create-customer/create-customer.component';
import {DetailCustomerComponent} from './customer/detail-customer/detail-customer.component';
import {CreateEmployeeComponent} from './employee/create-employee/create-employee.component';
import {ListEmployeeComponent} from './employee/list-employee/list-employee.component';
import {DetailEmployeeComponent} from './employee/detail-employee/detail-employee.component';
import {CreateServiceComponent} from './service/create-service/create-service.component';
import {ListServiceComponent} from './service/list-service/list-service.component';
import {DetailServiceComponent} from './service/detail-service/detail-service.component';
import {CreateContractComponent} from './contract/create-contract/create-contract.component';
import {ListContractComponent} from './contract/list-contract/list-contract.component';
import {DetailContractComponent} from './contract/detail-contract/detail-contract.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelect, MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ListCustomerComponent,
    CreateCustomerComponent,
    DetailCustomerComponent,
    CreateEmployeeComponent,
    ListEmployeeComponent,
    DetailEmployeeComponent,
    CreateServiceComponent,
    ListServiceComponent,
    DetailServiceComponent,
    CreateContractComponent,
    ListContractComponent,
    DetailContractComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
