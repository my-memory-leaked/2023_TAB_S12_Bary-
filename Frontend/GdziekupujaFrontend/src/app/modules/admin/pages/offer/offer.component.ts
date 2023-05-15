import { Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'my-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class OfferComponent { }
