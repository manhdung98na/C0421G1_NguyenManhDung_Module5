import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {CreateServiceComponent} from './create-service/create-service.component';
import {ListServiceComponent} from './list-service/list-service.component';
import {DetailServiceComponent} from './detail-service/detail-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';


@NgModule({
  declarations: [
    CreateServiceComponent,
    ListServiceComponent,
    DetailServiceComponent,
    EditServiceComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: []
})
export class ServiceModule {
}
