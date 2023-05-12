import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { CategoryFormHandlerService } from '@modules/admin/pages/category/services/category-form-handler.service';

@Component({
  selector: 'category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class CategoryAddComponent implements OnInit {

  form: FormGroup;

  constructor(
    private controlContainer: ControlContainer,
    private categoryFormHandlerService: CategoryFormHandlerService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.categoryFormHandlerService.setFormGroupForCategoryAdd(this.form);
  }
}
