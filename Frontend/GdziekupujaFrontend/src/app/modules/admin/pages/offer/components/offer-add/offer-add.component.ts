import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { Categories, Product, SalesPoint } from '@modules/offers/interfaces/offers.interface';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { ChangedNames } from '@modules/admin/interfaces/admin-form-response.interface';
import { OfferFormHandlerService } from '@modules/admin/pages/offer/services/offer-form-handler.service';
import { TopMenuService } from '@modules/top-menu/api/top-menu.service';

@Component({
  selector: 'offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class OfferAddComponent implements OnInit {

  form: FormGroup;
  products$: Observable<Product[]>;
  categories$: Observable<Categories[]>;

  categoriesIdsToAdd: number[] = [];
  categoriesToDisplay: Categories[] = [];
  additionalProperties: string[] = [];

  salesPoints$: Observable<SalesPoint[]>;
  salesPointsFixedNames: ChangedNames[] = [];

  constructor(
    private controlContainer: ControlContainer,
    private offerFormHandlerService: OfferFormHandlerService,
    private adminStorageService: AdminStorageService,
    private topMenuService: TopMenuService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.offerFormHandlerService.setFormGroupForOfferAdd(this.form);

    this.products$ = this.adminStorageService.products$.asObservable();
    this.categories$ = this.topMenuService.getAllCategories();

    this.salesPoints$ = this.adminStorageService.salesPoints$.asObservable();

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

  removeCategory(category: Categories) {
    this.categoriesToDisplay = this.categoriesToDisplay.filter((res) => res.id !== category.id);
    this.categoriesIdsToAdd = this.categoriesIdsToAdd.filter((id) => id !== category.id);
    this.categoryIds.setValue(this.categoriesIdsToAdd);
  }

  getProductProperties(id: number) {
    //lepiej wyciagac z formy?
    // console.log(id)
    // console.log(this.form.value)
  }
}
