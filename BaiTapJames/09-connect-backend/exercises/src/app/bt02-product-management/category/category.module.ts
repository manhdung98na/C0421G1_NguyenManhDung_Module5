import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CategoryEditComponent } from './category/category-edit/category-edit.component';


@NgModule({
  declarations: [CategoryListComponent, CategoryCreateComponent, CategoryEditComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
