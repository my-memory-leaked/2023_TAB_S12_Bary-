import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { SalesPointFormHandlerService } from '@modules/admin/pages/sales-point/services/sales-point-form-handler.service';
import { idNameOnly } from '@modules/top-menu/interfaces/top-menu.interface';

@Component({
  selector: 'sales-point-add',
  templateUrl: './sales-point-add.component.html',
  styleUrls: ['./sales-point-add.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class SalesPointAddComponent implements OnInit {

  form: FormGroup;
  counties: idNameOnly[] = [];
  isServiceAdmin: boolean;

  constructor(
    private controlContainer: ControlContainer,
    private salesPointFormHandlerService: SalesPointFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.salesPointFormHandlerService.setFormGroupForSalesPointAdd(this.form);

    this.isServiceAdmin = this.adminStorageService.isServiceAdmin;
    this.counties = this.adminStorageService.counties;

    this.form.get('postalCode').valueChanges.subscribe((res: string) => {
      if (res?.length === 5) {
        this.form.get('postalCode').setValue(res.slice(0, 2) + '-' + res.slice(2));
      }
    });
  }
}
