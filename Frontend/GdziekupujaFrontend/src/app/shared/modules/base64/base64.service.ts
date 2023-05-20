import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  deleteImage$ = new BehaviorSubject<boolean>(false);

  getDeleteImage(): Observable<boolean> {
    return this.deleteImage$.asObservable();
  }

  setDeleteImage(value: boolean): void {
    this.deleteImage$.next(value);
  }

  constructor() { }
}
