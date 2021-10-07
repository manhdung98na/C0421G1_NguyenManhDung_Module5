import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Bt01ToDoAppComponent} from './bt01-to-do-app/bt01-to-do-app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {ProductCreateComponent} from "./bt02-product-management/product/product/product-create/product-create.component";
import {ProductListComponent} from "./bt02-product-management/product/product/product-list/product-list.component";
import {ProductEditComponent} from "./bt02-product-management/product/product/product-edit/product-edit.component";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./bt02-product-management/shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    Bt01ToDoAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
