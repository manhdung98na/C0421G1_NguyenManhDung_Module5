import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {RouterModule} from "@angular/router";
import {FooterComponent} from "./layout/footer/footer.component";
import {HeaderComponent} from "./layout/header/header.component";
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

const MaterialComponent = [
  MatSnackBarModule,
  MatSelectModule,
  MatDialogModule,
  MatButtonModule,
  MatPaginatorModule,
]

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SnackBarComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialComponent,
    RouterModule,
  ],
  exports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialComponent,
    RouterModule,
    HeaderComponent,
    FooterComponent,
  ]
})
export class SharedModule {
}
