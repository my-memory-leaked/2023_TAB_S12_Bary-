import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { AddModifyOfferType } from '@modules/admin/types/admin-actions.types';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { OfferFormHandlerService } from '@modules/admin/pages/offer/services/offer-form-handler.service';

@Component({
  selector: 'offer-set-action',
  templateUrl: './offer-set-action.component.html',
  styleUrls: ['./offer-set-action.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class OfferSetActionComponent implements OnInit {

  form: FormGroup;
  prevType: AddModifyOfferType = 'AddOffer';

  constructor(
    private controlContainer: ControlContainer,
    private offerFormHandlerService: OfferFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit() {
    this.form = this.controlContainer.control as FormGroup;
    this.adminStorageService.currentAction = 'AddOffer';
  }

  handleActionTypeChange(prevType: MatButtonToggleChange) {
    if (this.prevType) {
      this.offerFormHandlerService.clearControls(this.form, this.prevType);
    }
    this.prevType = prevType.value;
  }
}
