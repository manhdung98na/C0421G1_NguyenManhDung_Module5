import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
  CreateComponent,
  ListComponent,
  DetailComponent,
  EditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class CoreModule { }
