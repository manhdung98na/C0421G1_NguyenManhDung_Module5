import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import {HeaderComponent} from "./layout/header/header.component";
import { ListCustomerComponent } from './customer/list-customer/list-customer.component';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { DetailCustomerComponent } from './customer/detail-customer/detail-customer.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        ListCustomerComponent,
        CreateCustomerComponent,
        DetailCustomerComponent,
        CreateEmployeeComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
