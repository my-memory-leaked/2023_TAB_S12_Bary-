import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { AddModifySalesPointType } from '@modules/admin/types/admin-actions.types';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { SalesPointFormHandlerService } from '@modules/admin/pages/sales-point/services/sales-point-form-handler.service';

@Component({
  selector: 'sales-point-set-action',
  templateUrl: './sales-point-set-action.component.html',
  styleUrls: ['./sales-point-set-action.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class SalesPointSetActionComponent implements OnInit {

  form: FormGroup;
  prevType: AddModifySalesPointType = 'AddSalesPoint';

  constructor(
    private controlContainer: ControlContainer,
    private salesPointFormHandlerService: SalesPointFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit() {
    this.form = this.controlContainer.control as FormGroup;
    this.adminStorageService.currentAction = 'AddSalesPoint';
  }

  handleActionTypeChange(prevType: MatButtonToggleChange) {
    if (this.prevType) {
      this.salesPointFormHandlerService.clearControls(this.form, this.prevType);
    }
    this.prevType = prevType.value;
  }
}
