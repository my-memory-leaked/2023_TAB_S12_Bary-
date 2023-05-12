import { Api } from '@core/enums/api.enum';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { AllAdminActionsType } from '@modules/admin/types/admin-actions.types';
import { MyLocalStorageService } from '@shared/services/my-local-storage.service';
import { idNameOnly, UserInfo } from '@modules/top-menu/interfaces/top-menu.interface';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';
import { Category, Product, SalesPoint, Offers } from '@modules/offers/interfaces/offers.interface';
import { DropDownText } from '@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminStorageService {

  constructor(
    private http: HttpClient,
    private myLocalStorageService: MyLocalStorageService,
    private toastMessageService: ToastMessageService,
  ) { }

  counties: idNameOnly[] = [];
  salesPoints$ = new BehaviorSubject<SalesPoint[]>([]);
  categories$ = new BehaviorSubject<Category[]>([]);
  products$ = new BehaviorSubject<Product[]>([]);
  users$ = new BehaviorSubject<UserInfo[]>([]);
  offers$ = new BehaviorSubject<Offers[]>([]);
  currentAction: AllAdminActionsType;
  isServiceAdmin: boolean;

  onInit(): void {
    this.isServiceAdmin = this.myLocalStorageService.isServiceAdmin();

    // this.getAllOffers().subscribe((res) => {
    //   this.offers$.next(res);
    // });

    this.getAllProducts().subscribe((res) => {
      this.products$.next(res);
    });

    this.getAllCategories().subscribe((res) => {
      this.categories$.next(res);
    });

    this.getAllSalesPoints().subscribe((res) => {
      this.salesPoints$.next(res);
    });

    this.getAllUsers().subscribe((res) => {
      this.users$.next(res);
    });

    this.getAllCounties().subscribe((res) => {
      this.counties = res ? res : [];
    });
  }

  getAllUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${environment.httpBackend}${Api.USERS}`).pipe(
      tap((res) => this.users$.next(res)),
      catchError(() => {
        this.toastMessageService.notifyOfError('Nie udało się pobrać użytkowników');
        return of([]);
      }),
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.httpBackend}${Api.PRODUCTS}`).pipe(
      tap((res) => this.products$.next(res)),
      catchError(() => {
        this.toastMessageService.notifyOfError('Nie udało się pobrać produktów');
        return of([]);
      }),
    );
  }

  getAllSalesPoints(): Observable<SalesPoint[]> {
    const countyId = this.isServiceAdmin ? '' : Number(localStorage.getItem('userCountyId'));
    const params = new HttpParams()
      .set('countyId', countyId);

    return this.http.get<SalesPoint[]>(`${environment.httpBackend}${Api.SALES_POINTS}`, { params })
      .pipe(
        tap((res) => this.salesPoints$.next(res)),
        catchError(() => {
          this.toastMessageService.notifyOfError('Nie udało się pobrać punktów sprzedaży');
          return of([]);
        }),
      );
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.httpBackend}${Api.GET_CATEGORIES_ALL_FLAT}`).pipe(
      tap((res) => this.categories$.next(res)),
      catchError(() => {
        this.toastMessageService.notifyOfError('Nie udało się pobrać kategorii');
        return of([]);
      }),
    );
  }

  getAllCounties(): Observable<idNameOnly[]> {
    return this.http.get<idNameOnly[]>(`${environment.httpBackend}${Api.COUNTIES}`).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError('Nie udało się pobrać powiatów');
        return of([]);
      }),
    );
  }

  deleteData(id: number, deleteApi: string): Observable<any> {
    return this.http.delete<any>(`${environment.httpBackend}${deleteApi}`.replace(':id', id.toString()))
      .pipe(
        catchError((err) => {
          this.toastMessageService.notifyOfError('Usuwanie nie powiodło się');
          return of();
        }),
      );
  }



  getData(operationText: DropDownText): Observable<any> {
    if (operationText === 'Oferta') {
      // return this.getAllOffers();
    }
    else if (operationText === 'Kategoria') {
      return this.getAllCategories();
    }
    else if (operationText === 'Produkt') {
      return this.getAllProducts();
    }
    else if (operationText === 'Punkt sprzedaży') {
      return this.getAllSalesPoints();
    }
    else if (operationText === 'Użytkownik') {
      return this.getAllUsers();
    }

    return of([]);
  }

  getDataForTable(operationText: DropDownText): Observable<any> {
    if (operationText === 'Oferta') {
      return this.offers$.asObservable();
    }
    else if (operationText === 'Kategoria') {
      return this.categories$.asObservable();
    }
    else if (operationText === 'Produkt') {
      return this.products$.asObservable();
    }
    else if (operationText === 'Punkt sprzedaży') {
      return this.salesPoints$.asObservable();
    }
    else if (operationText === 'Użytkownik') {
      return this.users$.asObservable();
    }

    return of([]);
  }
}