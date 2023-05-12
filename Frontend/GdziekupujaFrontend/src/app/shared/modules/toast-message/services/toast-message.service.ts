import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorToastComponent } from '@shared/modules/toast-message/components/error-toast/error-toast.component';
import { SuccessToastComponent } from '@shared/modules/toast-message/components/success-toast/success-toast.component';

@Injectable()
export class ToastMessageService {

  durationInMilliseconds = 4000;

  constructor(private _snackBar: MatSnackBar) { }

  notifyOfError(message: string) {
    this._snackBar.openFromComponent(ErrorToastComponent, {
      duration: this.durationInMilliseconds,
      data: message,
      panelClass: 'failure-toast',
    });
  }

  notifyOfSuccess(message: string) {
    this._snackBar.openFromComponent(SuccessToastComponent, {
      duration: this.durationInMilliseconds,
      data: message,
      panelClass: 'success-toast',
    });
  }
}
