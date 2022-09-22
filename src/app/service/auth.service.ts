import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BesUrl = environment.apiEndpointBase;
  constructor(private _http: HttpClient) { }

  adminLogin(data: any) {
    return this._http.post( this.BesUrl+ '/admin-login', data, { withCredentials: true });
  };

  logOut(data: any) {
    return this._http.post( this.BesUrl+ '/admin-logout', data);
  };
  
  isLoggedIn() {
    return !!localStorage.getItem('tokenUrl') != null;
  };

  getToken() {
    return localStorage.getItem('tokenUrl') || '';
  }
}
