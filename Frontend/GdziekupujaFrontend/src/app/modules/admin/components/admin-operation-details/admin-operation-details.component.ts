import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { AdminFormService } from '@modules/admin/services/admin-form.service';
import { AllAdminActionsType } from '@modules/admin/types/admin-actions.types';
import { ADMIN_RESPONSE_TOKEN } from '@modules/admin/tokens/admin-response.token';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { AdminSubmitFormService } from '@modules/admin/services/admin-submit-form.service';
import { AdminFormResponse } from '@modules/admin/interfaces/admin-form-response.interface';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';
import { DropDownText } from '@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface';

@Component({
  selector: 'admin-operation-details',
  templateUrl: './admin-operation-details.component.html',
  styleUrls: ['./admin-operation-details.component.scss']
})
export class AdminOperationDetailsComponent implements OnInit {

  adminForm: FormGroup;
  operationText: DropDownText;
  action: AllAdminActionsType;

  constructor(
    @Inject(ADMIN_RESPONSE_TOKEN) public formResponse: AdminFormResponse,
    private adminFormService: AdminFormService,
    private adminSubmitFormService: AdminSubmitFormService,
    private adminStorageService: AdminStorageService,
    private toastMessageService: ToastMessageService,
  ) { }

  ngOnInit(): void {
    this.adminForm = this.adminFormService.adminForm();
    this.operationText = this.formResponse.dropdown.name;
  }

  submitForm(): void {
    if (this.adminForm.valid) {
      this.adminSubmitFormService.sendForm(this.adminForm, this.adminStorageService.currentAction).subscribe(() => {
        this.action = this.adminStorageService.currentAction;
        this.clearForm();
      });
    } else {
      this.toastMessageService.notifyOfError("Źle wprowadzone dane");
    }
  }

  clearForm(): void {
    this.adminForm.reset();
  }

  clearAction() {
    setTimeout(() => this.action = null, 100)
  }
}