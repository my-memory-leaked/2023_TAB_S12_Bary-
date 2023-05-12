import { Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'my-sales-point',
  templateUrl: './sales-point.component.html',
  styleUrls: ['./sales-point.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class SalesPointComponent { }
