import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SalesPoint } from '@modules/offers/interfaces/offers.interface';
import { ControlContainer, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { SalesPointFormHandlerService } from '../../services/sales-point-form-handler.service';
import { idNameOnly } from '@modules/top-menu/interfaces/top-menu.interface';
import { ChangedNames } from '@modules/admin/interfaces/admin-form-response.interface';

@Component({
  selector: 'sales-point-modify',
  templateUrl: './sales-point-modify.component.html',
  styleUrls: ['./sales-point-modify.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class SalesPointModifyComponent implements OnInit {

  form: FormGroup;
  salesPoints: Observable<SalesPoint[]>;
  salesPointsFixedNames: ChangedNames[] = [];
  counties: idNameOnly[] = [];
  isServiceAdmin: boolean;

  constructor(
    private controlContainer: ControlContainer,
    private salesPointFormHandlerService: SalesPointFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.salesPointFormHandlerService.setFormGroupForSalesPointModify(this.form);

    this.isServiceAdmin = this.adminStorageService.isServiceAdmin;
    this.counties = this.adminStorageService.counties;
    this.salesPoints = this.adminStorageService.salesPoints$.asObservable();

    this.salesPoints.subscribe((result) => result.map((res) => {
      this.salesPointsFixedNames.push({
        id: res.id,
        changedName: res.name + ', ' + res.address.city + ' ul. ' + res.address.street + ' ' + res.address.number,
      })
    }));

    this.form.get('postalCode').valueChanges.subscribe((res: string) => {
      if (res?.length === 5) {
        this.form.get('postalCode').setValue(res.slice(0, 2) + '-' + res.slice(2));
      }
    });
  }
}