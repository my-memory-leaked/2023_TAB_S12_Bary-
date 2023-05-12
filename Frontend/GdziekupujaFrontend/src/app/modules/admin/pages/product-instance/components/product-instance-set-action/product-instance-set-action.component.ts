import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { AddModifyProductInstanceType } from '@modules/admin/types/admin-actions.types';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { ProductInstanceFormHandlerService } from '@modules/admin/pages/product-instance/services/product-instance-form-handler.service';

@Component({
  selector: 'product-instance-set-action',
  templateUrl: './product-instance-set-action.component.html',
  styleUrls: ['./product-instance-set-action.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class ProductInstanceSetActionComponent implements OnInit {

  form: FormGroup;
  prevType: AddModifyProductInstanceType = 'AddProductInstance';

  constructor(
    private controlContainer: ControlContainer,
    private productInstanceFormHandlerService: ProductInstanceFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit() {
    this.form = this.controlContainer.control as FormGroup;
    this.adminStorageService.currentAction = 'AddProductInstance';
  }

  handleActionTypeChange(prevType: MatButtonToggleChange) {
    if (this.prevType) {
      this.productInstanceFormHandlerService.clearControls(this.form, this.prevType);
    }
    this.prevType = prevType.value;
  }
}
