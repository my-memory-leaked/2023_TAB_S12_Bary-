import { Component, Input } from '@angular/core';
import { AddModifyProductInstanceType } from '@modules/admin/types/admin-actions.types';

@Component({
  selector: 'product-instance-type-switch',
  templateUrl: './product-instance-type-switch.component.html',
  styleUrls: ['./product-instance-type-switch.component.scss']
})

export class ProductInstanceTypeSwitchComponent {
  @Input() toggleValue: AddModifyProductInstanceType;
}
