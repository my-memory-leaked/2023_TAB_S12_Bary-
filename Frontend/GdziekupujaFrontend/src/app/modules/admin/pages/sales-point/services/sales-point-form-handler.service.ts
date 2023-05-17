import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ADMIN_FIELDS_LIST } from '@modules/admin/constants/clearing-fields-list.const';
import { AddModifySalesPointType } from '@modules/admin/types/admin-actions.types';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { ADDRESS_CITY_PATTERN, ADDRESS_NUMBER_PATTERN, ADDRESS_STREET_PATTERN } from '@core/constants/validation-patterns.conts';

@Injectable()
export class SalesPointFormHandlerService {

  constructor(
    private fb: FormBuilder,
    private adminStorageService: AdminStorageService,
  ) { }

  setFormGroupForSalesPointAdd(formGroup: FormGroup): void {
    formGroup.addControl('name', this.fb.control(null, [Validators.required]));
    formGroup.addControl('city', this.fb.control(null, Validators.compose([Validators.required, Validators.pattern(ADDRESS_CITY_PATTERN)])));
    formGroup.addControl('street', this.fb.control(null, Validators.compose([Validators.required, Validators.pattern(ADDRESS_STREET_PATTERN)])));
    formGroup.addControl('postalCode', this.fb.control(null, [Validators.required]));
    formGroup.addControl('number', this.fb.control(null, Validators.compose([Validators.required, Validators.pattern(ADDRESS_NUMBER_PATTERN)])));
    formGroup.addControl('countyId', this.fb.control(null, [Validators.required]));
  }

  setFormGroupForSalesPointModify(formGroup: FormGroup): void {
    formGroup.addControl('salesPoint', this.fb.control(null, [Validators.required]));
    formGroup.addControl('name', this.fb.control(null, [Validators.required]));
    formGroup.addControl('city', this.fb.control(null, Validators.compose([Validators.required, Validators.pattern(ADDRESS_CITY_PATTERN)])));
    formGroup.addControl('street', this.fb.control(null, Validators.compose([Validators.required, Validators.pattern(ADDRESS_STREET_PATTERN)])));
    formGroup.addControl('postalCode', this.fb.control(null, [Validators.required]));
    formGroup.addControl('number', this.fb.control(null, Validators.compose([Validators.required, Validators.pattern(ADDRESS_NUMBER_PATTERN)])));
    formGroup.addControl('countyId', this.fb.control(null, [Validators.required]));
  }

  clearControls(form: FormGroup, previousType: AddModifySalesPointType): void {
    this.adminStorageService.currentAction = previousType === 'AddSalesPoint' ? 'ModifySalesPoint' : 'AddSalesPoint';
    const previousFields = ADMIN_FIELDS_LIST[previousType];
    previousFields.forEach((field) => form.removeControl(field));
  }
}
