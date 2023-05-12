import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { AddModifyCategoryType } from '@modules/admin/types/admin-actions.types';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { CategoryFormHandlerService } from '@modules/admin/pages/category/services/category-form-handler.service';

@Component({
  selector: 'category-set-action',
  templateUrl: './category-set-action.component.html',
  styleUrls: ['./category-set-action.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class CategorySetActionComponent implements OnInit {

  form: FormGroup;
  prevType: AddModifyCategoryType = 'AddCategory';

  constructor(
    private controlContainer: ControlContainer,
    private categoryFormHandlerService: CategoryFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit() {
    this.form = this.controlContainer.control as FormGroup;
    this.adminStorageService.currentAction = 'AddCategory';
  }

  handleActionTypeChange(prevType: MatButtonToggleChange) {
    if (this.prevType) {
      this.categoryFormHandlerService.clearControls(this.form, this.prevType);
    }
    this.prevType = prevType.value;
  }
}
