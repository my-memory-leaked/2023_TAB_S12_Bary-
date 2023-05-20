import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangedNames } from '@modules/admin/interfaces/admin-form-response.interface';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { AdminSubmitFormService } from '@modules/admin/services/admin-submit-form.service';
import { Categories, Offers, Product, SalesPoint } from '@modules/offers/interfaces/offers.interface';
import { TopMenuService } from '@modules/top-menu/api/top-menu.service';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';
import { Observable, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-add-offer-dialog',
  templateUrl: './add-offer-dialog.component.html',
  styleUrls: ['./add-offer-dialog.component.scss']
})
export class AddOfferDialogComponent {

  addForm: FormGroup = this.fb.group({
    price: [null, [Validators.required]],
    salesPointId: [null, [Validators.required]],
    productId: [null, [Validators.required]],
    categoryIds: [null, [Validators.required]],
    additionalInfo: [null, [Validators.required]],
    image: [null, [Validators.required]],
  });

  modifyForm: FormGroup = this.fb.group({
    offer: [null, [Validators.required]],
    price: [null, [Validators.required]],
  });

  banForm: FormGroup = this.fb.group({
    offer: [null, [Validators.required]],
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

  offers: Observable<Offers[]>;
  offersFixedNames: ChangedNames[] = [];

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

    this.addForm.get('price').valueChanges.subscribe((res) => {
      if (Number.isNaN(Number(res))) {
        this.addForm.get('price').setErrors({ 'incorrect': true });
      }
    });

    this.modifyForm.get('price').valueChanges.subscribe((res) => {
      if (Number.isNaN(Number(res))) {
        this.modifyForm.get('price').setErrors({ 'incorrect': true });
      }
    });

    this.offers = this.adminStorageService.getAllOffers();

    this.offers.pipe(
      filter((res) => res.some((result) => result.userName === localStorage.getItem('userName'))),
    ).subscribe((result) => result.map((res) => {
      let additionalZero = '';
      let price = res.price.toString();
      if (price.charAt(price.length - 2) === '.') {
        additionalZero = '0';
      }

      this.offersFixedNames.push({
        id: res.id,
        changedName: 'id: ' + res.id + ' | ' + res.productInstance.product.name + ' | ' + res.price + additionalZero + 'zł',
      })
    }));
  }

  saveImage(image: File): void {
    this.addForm.patchValue({
      image: image,
    });
    this.addForm.get('image').updateValueAndValidity();
  }

  get categoryIds(): AbstractControl {
    return this.addForm.get('categoryIds');
  }

  get additionalInfo(): AbstractControl {
    return this.addForm.get('additionalInfo');
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

  handleFormSubmit(where: string) {
    if (this.addForm.valid && where === 'add') {
      console.log('add')
      this.adminSubmitFormService.addOffer(this.addForm).subscribe(() => {
        this.toastMessageService.notifyOfSuccess('Dodano ofertę')
        this.addForm.reset();
        this.dialogRef.close('refresh');
      })
    }
    else if (this.modifyForm.valid && where === 'modify') {
      console.log('modify')
      this.adminSubmitFormService.modifyOffer(this.modifyForm).subscribe(() => {
        this.toastMessageService.notifyOfSuccess('Zmodyfikowano ofertę')
        this.modifyForm.reset();
        this.dialogRef.close('refresh');
      })
    }
    else if (this.banForm.valid && where === 'ban') {
      console.log('modify')
      this.adminSubmitFormService.banOffer(this.banForm.value.offer).subscribe(() => {
        this.toastMessageService.notifyOfSuccess('Zmodyfikowano ofertę')
        this.modifyForm.reset();
        this.dialogRef.close('refresh');
      })
    }
  }

}
