import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { AddModifyProductType } from '@modules/admin/types/admin-actions.types';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { ProductFormHandlerService } from '@modules/admin/pages/product/services/product-form-handler.service';

@Component({
  selector: 'product-set-action',
  templateUrl: './product-set-action.component.html',
  styleUrls: ['./product-set-action.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class ProductSetActionComponent implements OnInit {

  form: FormGroup;
  prevType: AddModifyProductType = 'AddProduct';

  constructor(
    private controlContainer: ControlContainer,
    private productFormHandlerService: ProductFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit() {
    this.form = this.controlContainer.control as FormGroup;
    this.adminStorageService.currentAction = 'AddProduct';
  }

  handleActionTypeChange(prevType: MatButtonToggleChange) {
    if (this.prevType) {
      this.productFormHandlerService.clearControls(this.form, this.prevType);
    }
    this.prevType = prevType.value;
  }
}
