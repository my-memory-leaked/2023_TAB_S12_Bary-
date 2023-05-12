import { Component, Input } from '@angular/core';
import { AddModifyProductType } from '@modules/admin/types/admin-actions.types';

@Component({
  selector: 'product-type-switch',
  templateUrl: './product-type-switch.component.html',
  styleUrls: ['./product-type-switch.component.scss']
})

export class ProductTypeSwitchComponent {
  @Input() toggleValue: AddModifyProductType;
}
