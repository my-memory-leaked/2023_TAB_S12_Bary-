import { Component, Input } from '@angular/core';
import { AddModifyCategoryType } from '@modules/admin/types/admin-actions.types';

@Component({
  selector: 'category-type-switch',
  templateUrl: './category-type-switch.component.html',
  styleUrls: ['./category-type-switch.component.scss']
})

export class CategoryTypeSwitchComponent {
  @Input() toggleValue: AddModifyCategoryType;
}
