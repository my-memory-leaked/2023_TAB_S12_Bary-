import { Component, Input } from '@angular/core';
import { BanUnbanUserType } from '@modules/admin/types/admin-actions.types';

@Component({
  selector: 'user-type-switch',
  templateUrl: './user-type-switch.component.html',
  styleUrls: ['./user-type-switch.component.scss']
})

export class UserTypeSwitchComponent {
  @Input() toggleValue: BanUnbanUserType;
}
