import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Base64Component } from './base64.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    Base64Component,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    Base64Component,
  ],
})
export class Base64Module { }
