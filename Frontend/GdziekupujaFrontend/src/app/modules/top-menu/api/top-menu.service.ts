import { Api } from '@core/enums/api.enum';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';
import { idNameOnly, Login, Register, Token } from '@modules/top-menu/interfaces/top-menu.interface';
import { Categories } from '@modules/offers/interfaces/offers.interface';
import { NestedDropdown } from '@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface';

@Injectable()
export class TopMenuService {

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
  ) { }

  getAllCounties(): Observable<idNameOnly[]> {
    return this.http.get<idNameOnly[]>(`${environment.httpBackend}${Api.COUNTIES}`).pipe(
      catchError(() => {
        this.toastMessageService.notifyOfError('Nie udało się pobrać powiatów');
        return of([]);
      }),
    );
  }

  getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${environment.httpBackend}${Api.GET_CATEGORIES_ALL}`).pipe(
      catchError(() => {
        this.toastMessageService.notifyOfError('Nie udało się pobrać kategorii');
        return of([]);
      }),
    );
  }

  // getAllSuperiorCategories(): Observable<NestedDropdown<{ id: number }>[]> {
  //   return this.http.get<Categories[]>(`${environment.httpBackend}${Api.GET_CATEGORIES_ALL_SUPERIORS}`).pipe(
  //     map((res) => {
  //       const temp: NestedDropdown<{ id: number }>[] = [];
  //       res.map((result) => {
  //         temp.push({
  //           name: result.name,
  //           data: {
  //             id: result.id,
  //           },
  //         })
  //       });
  //       return temp;
  //     }),
  //     catchError(() => {
  //       this.toastMessageService.notifyOfError('Nie udało się pobrać kategorii');
  //       return of([]);
  //     }),
  //   );
  // }

  // getSuperiorCategoriesChildren(supId: number): Observable<NestedDropdown<{ id: number }>> {
  //   const params = new HttpParams()
  //     .set('supId', supId)
  //     .set('childrenCount', 2);

  //   return this.http.get<Categories[]>(`${environment.httpBackend}${Api.GET_CATEGORIES_BY_SUPERIOR}`, { params }).pipe(
  //     map((res) => res[0]),
  //     catchError((res) => {
  //       this.toastMessageService.notifyOfError('Nie udało się pobrać kategorii');
  //       return of();
  //     }),
  //   );
  // }

  loginUser({ email, password }: Login): Observable<Token> {
    return this.http.post<Token>(`${environment.httpBackend}${Api.LOGIN}`, { email, password })
      .pipe(
        catchError(() => {
          this.toastMessageService.notifyOfError('Niepoprawny e-mail lub hasło');
          return of();
        }),
      );
  }

  registerUser({ name, email, password, confirmedPassword }: Register): Observable<Register> {
    return this.http.post<Register>(`${environment.httpBackend}${Api.REGISTER}`, { name, email, password, confirmedPassword }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error);
        return of();
      }),
    );
  }

  // mapDataToNestedDropdown(data: Categories[]): NestedDropdown<{ id: number }>[] {
  //   return data.map((category) => {
  //     const nestedDropdown: NestedDropdown<{ id: number }> = {
  //       name: category.name,
  //       data: { id: category.id },
  //       children: []
  //     };

  //     if (category.inverseParent && category.inverseParent.length > 0) {
  //       nestedDropdown.children = this.mapDataToNestedDropdown(category.inverseParent);
  //     }

  //     return nestedDropdown;
  //   });
  // }
}