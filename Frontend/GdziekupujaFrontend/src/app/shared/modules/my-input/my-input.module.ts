import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from '@ngneat/input-mask';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyInputComponent } from '@shared/modules/my-input/my-input.component';

@NgModule({
  declarations: [
    MyInputComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    InputMaskModule.forRoot({
      isAsync: false,
      inputSelector: 'input',
    }),
  ],
  exports: [
    MyInputComponent,
  ],
})
export class MyInputModule { }
