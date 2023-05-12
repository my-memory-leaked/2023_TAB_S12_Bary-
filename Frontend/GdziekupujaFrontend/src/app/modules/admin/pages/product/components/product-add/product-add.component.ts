import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { ProductFormHandlerService } from '@modules/admin/pages/product/services/product-form-handler.service';

@Component({
  selector: 'product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class ProductAddComponent implements OnInit {

  form: FormGroup;

  constructor(
    private controlContainer: ControlContainer,
    private productFormHandlerService: ProductFormHandlerService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.productFormHandlerService.setFormGroupForProductAdd(this.form);
  }

}
