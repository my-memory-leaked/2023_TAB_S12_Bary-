import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetPrecisionPipe } from '@shared/pipes/set-precision.pipe';
import { AbstractControlToFormGroupPipe } from '@shared/pipes/abstract-ctrl-to-form-group.pipe';

@NgModule({
  declarations: [
    SetPrecisionPipe,
    AbstractControlToFormGroupPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SetPrecisionPipe,
    AbstractControlToFormGroupPipe,
  ]
})
export class SharedModule { }
