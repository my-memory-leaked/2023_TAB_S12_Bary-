import { Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'my-product-instance',
  templateUrl: './product-instance.component.html',
  styleUrls: ['./product-instance.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class ProductInstanceComponent { }
