import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddModifyOfferType } from '@modules/admin/types/admin-actions.types';
import { ADMIN_FIELDS_LIST } from '@modules/admin/constants/clearing-fields-list.const';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';

@Injectable()
export class OfferFormHandlerService {

  constructor(
    private fb: FormBuilder,
    private adminStorageService: AdminStorageService,
  ) { }

  setFormGroupForOfferAdd(formGroup: FormGroup): void {
    formGroup.addControl('price', this.fb.control(null, [Validators.required]));
    formGroup.addControl('salesPointId', this.fb.control(null, [Validators.required]));
    formGroup.addControl('productId', this.fb.control(null, [Validators.required]));
    formGroup.addControl('categoryIds', this.fb.control([] as number[], [Validators.required]));
    formGroup.addControl('additionalInfo', this.fb.control(null, [Validators.required]));
    formGroup.addControl('image', this.fb.control(null, [Validators.required]));
  }

  setFormGroupForOfferModify(formGroup: FormGroup): void {
    formGroup.addControl('offer', this.fb.control(null, [Validators.required]));
    formGroup.addControl('price', this.fb.control(null, [Validators.required]));
  }

  clearControls(form: FormGroup, previousType: AddModifyOfferType): void {
    this.adminStorageService.currentAction = previousType === 'AddOffer' ? 'ModifyOffer' : 'AddOffer';
    const previousFields = ADMIN_FIELDS_LIST[previousType];
    previousFields.forEach((field) => form.removeControl(field));
  }
}
