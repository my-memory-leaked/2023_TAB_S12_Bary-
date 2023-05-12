import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Category } from '@modules/offers/interfaces/offers.interface';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { CategoryFormHandlerService } from '@modules/admin/pages/category/services/category-form-handler.service';

@Component({
  selector: 'category-modify',
  templateUrl: './category-modify.component.html',
  styleUrls: ['./category-modify.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class CategoryModifyComponent implements OnInit {

  form: FormGroup;
  categories: Observable<Category[]>;

  constructor(
    private controlContainer: ControlContainer,
    private categoryFormHandlerService: CategoryFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.categoryFormHandlerService.setFormGroupForCategoryModify(this.form);

    this.categories = this.adminStorageService.categories$.asObservable();
  }
}