import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { ProductInstanceFormHandlerService } from '@modules/admin/pages/product-instance/services/product-instance-form-handler.service';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { Categories, Product } from '@modules/offers/interfaces/offers.interface';
import { TopMenuService } from '@modules/top-menu/api/top-menu.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-instance-add',
  templateUrl: './product-instance-add.component.html',
  styleUrls: ['./product-instance-add.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class ProductInstanceAddComponent implements OnInit {

  form: FormGroup;
  products: Observable<Product[]>;
  categories$: Observable<Categories[]>;
  categoriesIdsToAdd: number[] = [];
  categoriesToDisplay: Categories[] = [];
  additionalProperties: string[] = [];

  constructor(
    private controlContainer: ControlContainer,
    private productInstanceFormHandlerService: ProductInstanceFormHandlerService,
    private adminStorageService: AdminStorageService,
    private topMenuService: TopMenuService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.productInstanceFormHandlerService.setFormGroupForProductInstanceAdd(this.form);

    this.products = this.adminStorageService.products$.asObservable();
    this.categories$ = this.topMenuService.getAllCategories();
  }

  saveImage(image: File): void {
    this.form.patchValue({
      image: image,
    });
    this.form.get('image').updateValueAndValidity();
  }

  get categoryIds(): AbstractControl {
    return this.form.get('categoryIds');
  }

  get part1(): AbstractControl {
    return this.form.get('part1');
  }

  get part2(): AbstractControl {
    return this.form.get('part2');
  }

  get additionalInfo(): AbstractControl {
    return this.form.get('additionalInfo');
  }

  addCategory(category: Categories): void {
    if (this.categoriesIdsToAdd.findIndex((id) => id === category.id) !== -1)
      return;

    this.categoriesToDisplay.push(category);
    this.categoriesIdsToAdd.push(category.id);
    this.categoryIds.setValue(this.categoriesIdsToAdd);

  }

  removeCategory(category: Categories) {
    this.categoriesToDisplay = this.categoriesToDisplay.filter((res) => res.id !== category.id);
    this.categoriesIdsToAdd = this.categoriesIdsToAdd.filter((id) => id !== category.id);
    this.categoryIds.setValue(this.categoriesIdsToAdd);
  }

  mergeAndAddAdditionalInfo(): void {
    if (this.part1.value && this.part2.value) {
      const merged = '"' + this.part1.value + '": ' + '"' + this.part2.value + '"';
      if (this.additionalProperties.findIndex((res) => res === merged) !== -1)
        return;

      this.additionalProperties.push(merged);
      this.additionalInfo.setValue(this.additionalProperties);

      this.part1.reset();
      this.part2.reset();
    }
  }

  removeAdditionalInfo(info: string): void {
    this.additionalProperties = this.additionalProperties.filter((res) => res !== info);
    this.additionalInfo.setValue(this.additionalProperties);
  }
}
