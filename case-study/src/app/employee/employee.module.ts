import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';



@NgModule({
  declarations: [CreateEmployeeComponent, ListEmployeeComponent, DetailEmployeeComponent, EditEmployeeComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EmployeeModule { }
