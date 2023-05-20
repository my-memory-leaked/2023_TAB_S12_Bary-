import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Offers } from '@modules/offers/interfaces/offers.interface';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { ChangedNames } from '@modules/admin/interfaces/admin-form-response.interface';
import { OfferFormHandlerService } from '@modules/admin/pages/offer/services/offer-form-handler.service';

@Component({
  selector: 'offer-modify',
  templateUrl: './offer-modify.component.html',
  styleUrls: ['./offer-modify.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class OfferModifyComponent implements OnInit {

  form: FormGroup;
  offers: Observable<Offers[]>;
  offersFixedNames: ChangedNames[] = [];

  constructor(
    private controlContainer: ControlContainer,
    private offerFormHandlerService: OfferFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.offerFormHandlerService.setFormGroupForOfferModify(this.form);

    this.offers = this.adminStorageService.offers$.asObservable();

    this.offers.subscribe((result) => result.map((res) => {
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

    this.form.get('price').valueChanges.subscribe((res) => {
      if (Number.isNaN(Number(res))) {
        this.form.get('price').setErrors({ 'incorrect': true });
      }
    });
  }
}