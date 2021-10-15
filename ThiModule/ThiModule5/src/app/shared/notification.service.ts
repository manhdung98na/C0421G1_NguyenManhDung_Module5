import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "./snack-bar/snack-bar.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  showNotification(message: string, buttonText: string, status: 'error' | 'success'){
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: message,
        buttonText: buttonText,
        status: status == 'error' ? 'Error' : 'Success'
      },
      duration: 2000,
      panelClass: status
    })
  }
}
