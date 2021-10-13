import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateContractComponent} from "./create-contract/create-contract.component";
import {ListContractComponent} from "./list-contract/list-contract.component";
import {DetailContractComponent} from "./detail-contract/detail-contract.component";
import {SharedModule} from "../shared/shared.module";
import {ContractRoutingModule} from "./contract-routing.module";



@NgModule({
  declarations: [
    CreateContractComponent,
    ListContractComponent,
    DetailContractComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContractRoutingModule
  ]
})
export class ContractModule { }
