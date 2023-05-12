import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { Token, TokenContent } from '@modules/top-menu/interfaces/top-menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MyLocalStorageService {

  setStorage(token: Token) {
    localStorage.setItem('userToken', token.tokenContent);
    
    const tokenData = jwt_decode(token.tokenContent) as TokenContent;
    localStorage.setItem('userName', tokenData.name);
    localStorage.setItem('userEmail', tokenData.email);
    localStorage.setItem('userIsAdmin', tokenData.isAdmin);
    localStorage.setItem('userId', tokenData.userId);
    localStorage.setItem('userCommenting', tokenData.canComment);
  }

  removeStorage() {
    localStorage.clear();
  }

  isServiceAdmin(): boolean {
    if (localStorage.getItem('userIsAdmin') === 'true') {
      return true;
    }
    return false;
  }

  isLogged(): boolean {
    return !!localStorage.getItem('userToken');
  }
}
