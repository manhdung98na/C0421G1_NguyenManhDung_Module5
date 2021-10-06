import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DictionaryPageComponent } from './bt01-dictionary/dictionary-page/dictionary-page.component';
import { DictionaryDetailComponent } from './bt01-dictionary/dictionary-detail/dictionary-detail.component';
import { ProductCreateComponent } from './bt02-product-management/product/product-create/product-create.component';
import { ProductListComponent } from './bt02-product-management/product/product-list/product-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ProductEditComponent } from './bt02-product-management/product/product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DictionaryPageComponent,
    DictionaryDetailComponent,
    ProductCreateComponent,
    ProductListComponent,
    ProductEditComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
