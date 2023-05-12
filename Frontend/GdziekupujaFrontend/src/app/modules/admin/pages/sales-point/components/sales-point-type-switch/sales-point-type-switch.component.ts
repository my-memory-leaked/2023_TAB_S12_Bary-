import { Component, Input } from '@angular/core';
import { AddModifySalesPointType } from '@modules/admin/types/admin-actions.types';

@Component({
  selector: 'sales-point-type-switch',
  templateUrl: './sales-point-type-switch.component.html',
  styleUrls: ['./sales-point-type-switch.component.scss']
})

export class SalesPointTypeSwitchComponent {
  @Input() toggleValue: AddModifySalesPointType;
}
