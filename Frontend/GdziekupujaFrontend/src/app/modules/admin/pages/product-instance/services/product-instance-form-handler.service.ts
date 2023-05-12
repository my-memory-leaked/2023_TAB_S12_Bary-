import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddModifyProductInstanceType } from '@modules/admin/types/admin-actions.types';
import { ADMIN_FIELDS_LIST } from '@modules/admin/constants/clearing-fields-list.const';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';

@Injectable()
export class ProductInstanceFormHandlerService {

  constructor(
    private fb: FormBuilder,
    private adminStorageService: AdminStorageService,
  ) { }

  setFormGroupForProductInstanceAdd(formGroup: FormGroup): void {
    formGroup.addControl('productId', this.fb.control(null, [Validators.required]));
    formGroup.addControl('categoryIds', this.fb.control([] as number[], [Validators.required]));
    formGroup.addControl('additionalInfo', this.fb.control(null, [Validators.required]));
    formGroup.addControl('image', this.fb.control(null, [Validators.required]));

    formGroup.addControl('part1', this.fb.control(null));
    formGroup.addControl('part2', this.fb.control(null));
  }

  setFormGroupForProductInstanceModify(formGroup: FormGroup): void {
    formGroup.addControl('productInstanceId', this.fb.control(null, [Validators.required]));
    formGroup.addControl('productId', this.fb.control(null, [Validators.required]));
    formGroup.addControl('categoryIds', this.fb.control([] as number[], [Validators.required]));
    formGroup.addControl('additionalInfo', this.fb.control(null, [Validators.required]));
    formGroup.addControl('image', this.fb.control(null, [Validators.required]));
  }

  clearControls(form: FormGroup, previousType: AddModifyProductInstanceType): void {
    this.adminStorageService.currentAction = previousType === 'AddProductInstance' ? 'ModifyProductInstance' : 'AddProductInstance';
    const previousFields = ADMIN_FIELDS_LIST[previousType];
    previousFields.forEach((field) => form.removeControl(field));
  }
}
