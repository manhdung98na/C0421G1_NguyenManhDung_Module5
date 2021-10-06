import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DictionaryPageComponent} from "./bt01-dictionary/dictionary-page/dictionary-page.component";
import {DictionaryDetailComponent} from "./bt01-dictionary/dictionary-detail/dictionary-detail.component";
import {ProductListComponent} from "./bt02-product-management/product/product-list/product-list.component";
import {ProductCreateComponent} from "./bt02-product-management/product/product-create/product-create.component";
import {ProductEditComponent} from "./bt02-product-management/product/product-edit/product-edit.component";


const routes: Routes = [
  {
    path: 'dictionary',
    component: DictionaryPageComponent,
  },
  {
    path: 'dictionary/:word',
    component: DictionaryDetailComponent
  },
  {
    path: 'product/list',
    component: ProductListComponent
  },
  {
    path: 'product/create',
    component: ProductCreateComponent
  },
  {
    path: 'product/edit/:id',
    component: ProductEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
