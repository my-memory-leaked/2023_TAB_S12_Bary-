import { Component, Input } from '@angular/core';
import { AddModifyOfferType } from '@modules/admin/types/admin-actions.types';

@Component({
  selector: 'offer-type-switch',
  templateUrl: './offer-type-switch.component.html',
  styleUrls: ['./offer-type-switch.component.scss']
})

export class OfferTypeSwitchComponent {
  @Input() toggleValue: AddModifyOfferType;
}
