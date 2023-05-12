import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Category, Product } from '@modules/offers/interfaces/offers.interface';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { ProductFormHandlerService } from '@modules/admin/pages/product/services/product-form-handler.service';

@Component({
  selector: 'product-modify',
  templateUrl: './product-modify.component.html',
  styleUrls: ['./product-modify.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class ProductModifyComponent implements OnInit {

  form: FormGroup;
  products: Observable<Product[]>;

  constructor(
    private controlContainer: ControlContainer,
    private productFormHandlerService: ProductFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.productFormHandlerService.setFormGroupForProductModify(this.form);

    this.products = this.adminStorageService.products$.asObservable();
  }
}