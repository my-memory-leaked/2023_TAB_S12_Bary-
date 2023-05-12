import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddModifyProductType } from '@modules/admin/types/admin-actions.types';
import { ADMIN_FIELDS_LIST } from '@modules/admin/constants/clearing-fields-list.const';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';

@Injectable()
export class ProductFormHandlerService {

  constructor(
    private fb: FormBuilder,
    private adminStorageService: AdminStorageService,
  ) { }

  setFormGroupForProductAdd(formGroup: FormGroup): void {
    formGroup.addControl('name', this.fb.control(null, [Validators.required]));
  }

  setFormGroupForProductModify(formGroup: FormGroup): void {
    formGroup.addControl('product', this.fb.control(null, [Validators.required]));
    formGroup.addControl('name', this.fb.control(null, [Validators.required]));
  }

  clearControls(form: FormGroup, previousType: AddModifyProductType): void {
    this.adminStorageService.currentAction = previousType === 'AddProduct' ? 'ModifyProduct' : 'AddProduct';
    const previousFields = ADMIN_FIELDS_LIST[previousType];
    previousFields.forEach((field) => form.removeControl(field));
  }
}
