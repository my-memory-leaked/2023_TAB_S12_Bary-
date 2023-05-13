import { Api } from '@core/enums/api.enum';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AllAdminActionsType } from '@modules/admin/types/admin-actions.types';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';

@Injectable()
export class AdminSubmitFormService {

  data: Observable<number>;

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
  ) { }

  sendForm(form: FormGroup, currentAction: AllAdminActionsType): Observable<number> {
    switch (currentAction) {
      // case 'AddOffer': {
      //   this.data = this.addOffer(form);
      //   break;
      // }
      // case 'ModifyOffer': {
      //   this.data = this.modifyOffer(form);
      //   break;
      // }
      case 'AddCategory': {
        this.data = this.addCategory(form);
        break;
      }
      case 'ModifyCategory': {
        this.data = this.modifyCategory(form);
        break;
      }
      case 'AddProduct': {
        this.data = this.addProduct(form);
        break;
      }
      // case 'ModifyProduct': {
      //   this.data = this.modifyProduct(form);
      //   break;
      // }
      case 'AddProductInstance': {
        this.data = this.addProductInstance(form);
        break;
      }
      // case 'ModifyProductInstance': {
      //   this.data = this.modifyProductInstance(form);
      //   break;
      // }
      case 'AddSalesPoint': {
        this.data = this.addSalesPoint(form);
        break;
      }
      case 'ModifySalesPoint': {
        this.data = this.modifySalesPoint(form);
        break;
      }
      // case 'BanUser': {
      //   this.data = this.banUser(form);
      //   break;
      // }
      // case 'UnbanUser': {
      //   this.data = this.unbanUser(form);
      //   break;
      // }
      default: {
        break;
      }
    }
    return this.data;
  }

  addProduct(form: FormGroup): Observable<number> {
    const name = form.value.name;

    return this.http.post<number>(`${environment.httpBackend}${Api.PRODUCTS}`, { name }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się dodać produktu');
        return of();
      }),
    );
  }

  addProductInstance(form: FormGroup): Observable<number> {
    const obj: { [key: string]: string } = {};
    form.value.additionalInfo.forEach((item: string) => {
      const [key, value] = item.split(':').map(str => str.replace(/"/g, '').trim());
      obj[key] = value;
    });
    const additionalInfo = JSON.stringify(obj);

    const formData = new FormData();
    formData.append('ProductId', form.value.productId);
    formData.append('CategoryIds', form.value.categoryIds);
    formData.append('AdditionalInfo', additionalInfo);
    formData.append('Image', form.value.image);

    console.log(formData)

    return this.http.post<number>(`${environment.httpBackend}${Api.PRODUCT_INSTANCE}`, formData).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się dodać produktu');
        return of();
      }),
    );
  }

  addCategory(form: FormGroup): Observable<number> {
    const name = form.value.name;
    const parentId = form.value.parentId;

    return this.http.post<number>(`${environment.httpBackend}${Api.CATEGORIES}`, { name, parentId }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się dodać kategorii');
        return of();
      }),
    );
  }

  modifyCategory(form: FormGroup): Observable<number> {
    const name = form.value.name;
    const parentId = form.value.parentId;

    return this.http.put<number>(`${environment.httpBackend}${Api.CATEGORY_ID}`.replace(':id', form.value.category), { name, parentId }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się zmodyfikować kategorii');
        return of();
      }),
    );
  }

  addSalesPoint(form: FormGroup): Observable<number> {
    const name = form.value.name;
    const address = {
      city: form.value.city,
      street: form.value.street,
      postalCode: form.value.postalCode,
      number: Number(form.value.number),
      countyId: form.value.countyId ? form.value.countyId : Number(localStorage.getItem('userCountyId')),
    };

    return this.http.post<number>(`${environment.httpBackend}${Api.SALES_POINTS}`, { name, address }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się dodać punktu sprzedaży');
        return of();
      }),
    );
  }

  modifySalesPoint(form: FormGroup): Observable<number> {
    const name = form.value.name;
    const address = {
      city: form.value.city,
      street: form.value.street,
      postalCode: form.value.postalCode,
      number: Number(form.value.number),
      countyId: form.value.countyId ? form.value.countyId : Number(localStorage.getItem('userProfileCountyId')),
    };

    return this.http.put<number>(`${environment.httpBackend}${Api.SALES_POINT_ID}`.replace(':id', form.value.salesPoint), { name, address }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się zmodyfikować punktu sprzedaży');
        return of();
      }),
    );
  }
}
