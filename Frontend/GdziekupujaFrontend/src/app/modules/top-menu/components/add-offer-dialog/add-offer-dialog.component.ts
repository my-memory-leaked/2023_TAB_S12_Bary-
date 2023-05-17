import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangedNames } from '@modules/admin/interfaces/admin-form-response.interface';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { AdminSubmitFormService } from '@modules/admin/services/admin-submit-form.service';
import { OffersService } from '@modules/offers/api/offers.service';
import { Categories, Product, SalesPoint } from '@modules/offers/interfaces/offers.interface';
import { TopMenuService } from '@modules/top-menu/api/top-menu.service';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-offer-dialog',
  templateUrl: './add-offer-dialog.component.html',
  styleUrls: ['./add-offer-dialog.component.scss']
})
export class AddOfferDialogComponent {

  form: FormGroup = this.fb.group({
    price: [null, [Validators.required]],
    salesPointId: [null, [Validators.required]],
    productId: [null, [Validators.required]],
    categoryIds: [null, [Validators.required]],
    additionalInfo: [null, [Validators.required]],
    image: [null, [Validators.required]],
  });

  products$: Observable<Product[]>;
  categories$: Observable<Categories[]>;

  categoriesIdsToAdd: number[] = [];
  categoriesToDisplay: Categories[] = [];
  additionalProperties: string[] = [];
  productPropertiesAll: unknown;
  productPropertiesKeys: string[] = [];

  salesPoints$: Observable<SalesPoint[]>;
  salesPointsFixedNames: ChangedNames[] = [];

  constructor(
    private fb: FormBuilder,
    private toastMessageService: ToastMessageService,
    private adminSubmitFormService: AdminSubmitFormService,
    private adminStorageService: AdminStorageService,
    private topMenuService: TopMenuService,
    public dialogRef: MatDialogRef<AddOfferDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.products$ = this.adminStorageService.getAllProducts();
    this.categories$ = this.topMenuService.getAllCategories();

    this.salesPoints$ = this.adminStorageService.getAllSalesPoints();

    this.salesPoints$.subscribe((result) => result.map((res) => {
      this.salesPointsFixedNames.push({
        id: res.id,
        changedName: res.name + ', ' + res.address.city + ' ul. ' + res.address.street + ' ' + res.address.number,
      })
    }));

    this.form.get('price').valueChanges.subscribe((res) => {
      if (Number.isNaN(Number(res))) {
        this.form.get('price').setErrors({ 'incorrect': true });
      }
    });
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

  removeCategory(category: Categories): void {
    this.categoriesToDisplay = this.categoriesToDisplay.filter((res) => res.id !== category.id);
    this.categoriesIdsToAdd = this.categoriesIdsToAdd.filter((id) => id !== category.id);
    this.categoryIds.setValue(this.categoriesIdsToAdd);
  }

  getProductProperties(id: number): void {
    this.adminStorageService.getProductProperties(id).subscribe((res) => {
      this.productPropertiesKeys = res.keys;
      this.productPropertiesAll = res.data;

      let temp: { key: string, value: string }[] = []
      this.productPropertiesKeys.forEach((res) => {
        temp.push({ key: res, value: this.productPropertiesAll[res][0] });
      })

      this.additionalInfo.setValue(temp)
    });
  }

  toggleChange(key: string, value: string): void {
    let data: { key: string, value: string }[] = this.additionalInfo.value;

    data = data.map((res) => {
      if (res.key === key) {
        return {
          key: res.key,
          value: value,
        }
      }
      return res
    })

    this.additionalInfo.setValue(data);
  }

  handleFormSubmit() {
    if (this.form.valid) {
      this.adminSubmitFormService.addOffer(this.form).subscribe(() => {
        this.toastMessageService.notifyOfSuccess('Dodano ofertę')
        this.form.reset();
        this.dialogRef.close('refresh');
      })
    }
  }

}
