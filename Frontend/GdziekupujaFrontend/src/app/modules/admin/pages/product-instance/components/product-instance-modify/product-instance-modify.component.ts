import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Category, Product } from '@modules/offers/interfaces/offers.interface';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { ProductInstanceFormHandlerService } from '@modules/admin/pages/product-instance/services/product-instance-form-handler.service';

@Component({
  selector: 'product-instance-modify',
  templateUrl: './product-instance-modify.component.html',
  styleUrls: ['./product-instance-modify.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class ProductInstanceModifyComponent implements OnInit {

  form: FormGroup;
  products: Observable<Product[]>;

  constructor(
    private controlContainer: ControlContainer,
    private productInstanceFormHandlerService: ProductInstanceFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.productInstanceFormHandlerService.setFormGroupForProductInstanceModify(this.form);

    this.products = this.adminStorageService.products$.asObservable();
  }
}