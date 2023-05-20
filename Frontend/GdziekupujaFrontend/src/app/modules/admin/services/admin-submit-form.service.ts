import { Api } from '@core/enums/api.enum';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AllAdminActionsType } from '@modules/admin/types/admin-actions.types';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';

@Injectable()
export class AdminSubmitFormService {

  data: Observable<number>;
  private clearData$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
  ) { }

  getClearData(): Observable<boolean> {
    return this.clearData$.asObservable();
  }

  setClearData(value: boolean): void {
    this.clearData$.next(value);
  }

  sendForm(form: FormGroup, currentAction: AllAdminActionsType): Observable<number> {
    switch (currentAction) {
      case 'AddOffer': {
        this.data = this.addOffer(form);
        break;
      }
      case 'ModifyOffer': {
        this.data = this.modifyOffer(form);
        break;
      }
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
      case 'ModifyProduct': {
        this.data = this.modifyProduct(form);
        break;
      }
      case 'AddSalesPoint': {
        this.data = this.addSalesPoint(form);
        break;
      }
      case 'ModifySalesPoint': {
        this.data = this.modifySalesPoint(form);
        break;
      }
      case 'BanUser': {
        this.data = this.banUser(form);
        break;
      }
      case 'UnbanUser': {
        this.data = this.unbanUser(form);
        break;
      }
      default: {
        break;
      }
    }
    return this.data;
  }

  addOffer(form: FormGroup): Observable<number> {
    let data = '{'
    form.value.additionalInfo.forEach((item: { key: string, value: string }) => {
      data += `"${item.key}": "${item.value}",`;
    });
    data = data.slice(0, -1);
    data += '}';

    const params = new HttpParams()
      .set('Price', Number(form.value.price))
      .set('SalesPointId', form.value.salesPointId)
      .set('UserId', localStorage.getItem('userId'));

    const formData = new FormData();
    formData.append('ProductId', form.value.productId);
    formData.append('additionalInfo', data);
    formData.append('Image', form.value.image);

    const categories: number[] = form.value.categoryIds
    categories.forEach((category) => {
      formData.append('CategoryIds', category.toString());
    })

    return this.http.post<number>(`${environment.httpBackend}${Api.OFFERS}`, formData, { params }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Price ? err.error.errors.Price[0] : 'Nie udało się dodać oferty');
        return of();
      }),
    );
  }

  modifyOffer(form: FormGroup): Observable<number> {
    const params = new HttpParams()
      .set('price', Number(form.value.price))

    return this.http.put<number>(`${environment.httpBackend}${Api.OFFER_ID}`.replace(':id', form.value.offer.toString()), {}, { params }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Price ? err.error.errors.Price[0] : 'Nie udało się zmodyfikować oferty');
        return of();
      }),
    );
  }

  addProduct(form: FormGroup): Observable<number> {
    const name = form.value.name;
    const availableProps = form.value.availableProps;

    return this.http.post<number>(`${environment.httpBackend}${Api.PRODUCTS}`, { name, availableProps }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się dodać produktu');
        return of();
      }),
    );
  }

  modifyProduct(form: FormGroup): Observable<number> {
    const name = form.value.name;
    const availableProps = form.value.availableProps;

    return this.http.put<number>(`${environment.httpBackend}${Api.PRODUCT_ID}`.replace(':id', form.value.product), { name, availableProps }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się zmodyfikować produktu');
        return of();
      }),
    );
  }

  addCategory(form: FormGroup): Observable<number> {
    const name = form.value.name;
    const parentId = form.value.parentId !== '' ? form.value.parentId : null;

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
      countyId: form.value.countyId ? form.value.countyId : Number(localStorage.getItem('userCountyId')),
    };

    return this.http.put<number>(`${environment.httpBackend}${Api.SALES_POINT_ID}`.replace(':id', form.value.salesPoint), { name, address }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się zmodyfikować punktu sprzedaży');
        return of();
      }),
    );
  }

  banUser(form: FormGroup): Observable<any> {
    const params = new HttpParams()
      .set('adminId', Number(localStorage.getItem('userId')))
      .set('userId', form.value.id)

    return this.http.put<any>(`${environment.httpBackend}${Api.USER_BAN}`, {}, { params }).pipe(
      catchError(() => {
        this.toastMessageService.notifyOfError('Nie udało się zbanować użytkownika');
        return of();
      }),
    );
  }

  unbanUser(form: FormGroup): Observable<number> {
    const params = new HttpParams()
      .set('adminId', Number(localStorage.getItem('userId')))
      .set('userId', form.value.id)

    return this.http.put<any>(`${environment.httpBackend}${Api.USER_UNBAN}`, {}, { params }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się odbanować użytkownika');
        return of();
      }),
    );
  }
}
