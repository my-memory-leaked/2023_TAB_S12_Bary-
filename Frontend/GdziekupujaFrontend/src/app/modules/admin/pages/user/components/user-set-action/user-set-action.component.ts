import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { BanUnbanUserType } from '@modules/admin/types/admin-actions.types';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { UserFormHandlerService } from '../../services/user-form-handler.service';

@Component({
  selector: 'user-set-action',
  templateUrl: './user-set-action.component.html',
  styleUrls: ['./user-set-action.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class UserSetActionComponent implements OnInit {

  form: FormGroup;
  prevType: BanUnbanUserType = 'BanUser';

  constructor(
    private controlContainer: ControlContainer,
    private userFormHandlerService: UserFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit() {
    this.form = this.controlContainer.control as FormGroup;
    this.adminStorageService.currentAction = 'BanUser';
  }

  handleActionTypeChange(prevType: MatButtonToggleChange) {
    if (this.prevType) {
      this.userFormHandlerService.clearControls(this.form, this.prevType);
    }
    this.prevType = prevType.value;
  }
}
