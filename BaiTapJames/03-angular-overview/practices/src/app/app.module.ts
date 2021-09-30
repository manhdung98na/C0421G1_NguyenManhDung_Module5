import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChangeFontSizeComponent } from './01-chang-font-size/change-font-size.component';
import {FormsModule} from '@angular/forms';
import { ShowPetInfoComponent } from './02-show-pet-info/show-pet-info.component';
import { ShowProductListComponent } from './03-show-product-list/show-product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ChangeFontSizeComponent,
    ShowPetInfoComponent,
    ShowProductListComponent
  ],
    imports: [
        BrowserModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
