import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastMessageComponent } from '@shared/modules/toast-message/toast-message.component';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';
import { ErrorToastComponent } from '@shared/modules/toast-message/components/error-toast/error-toast.component';
import { SuccessToastComponent } from '@shared/modules/toast-message/components/success-toast/success-toast.component';

@NgModule({
  declarations: [
    ErrorToastComponent,
    ToastMessageComponent,
    SuccessToastComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
  ],
  providers: [
    ToastMessageService,
  ],
})
export class ToastMessageModule { }
