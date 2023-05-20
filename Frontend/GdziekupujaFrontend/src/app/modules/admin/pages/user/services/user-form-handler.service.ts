import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BanUnbanUserType } from '@modules/admin/types/admin-actions.types';
import { ADMIN_FIELDS_LIST } from '@modules/admin/constants/clearing-fields-list.const';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';

@Injectable()
export class UserFormHandlerService {

  constructor(
    private fb: FormBuilder,
    private adminStorageService: AdminStorageService,
  ) { }

  setFormGroupForUserBan(formGroup: FormGroup): void {
    formGroup.addControl('userId', this.fb.control(null, [Validators.required]));
    formGroup.addControl('action', this.fb.control(null, [Validators.required]));
  }
  
  setFormGroupForUserUnban(formGroup: FormGroup): void {
    formGroup.addControl('userId', this.fb.control(null, [Validators.required]));
    formGroup.addControl('action', this.fb.control(null, [Validators.required]));
  }

  clearControls(form: FormGroup, previousType: BanUnbanUserType): void {
    this.adminStorageService.currentAction = previousType === 'BanUser' ? 'UnbanUser' : 'BanUser';
    const previousFields = ADMIN_FIELDS_LIST[previousType];
    previousFields.forEach((field) => form.removeControl(field));
  }
}
