import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url() {
    throw new Error('Method not implemented.');
  }

  private BesUrl = environment.apiEndpointBase;
  constructor(private _http: HttpClient) { }

  getMethod(url_paremter: any) {
    return this._http.get(this.BesUrl + url_paremter);
  };
  
  getCatetoryList() {
    return this._http.get( this.BesUrl+ '/admin/category-list');
  };
  
  getSubCatetoryList() {
    return this._http.get( this.BesUrl+ '/admin/sub-category-list');
  };
  getfreightCharges() {
    return this._http.get( this.BesUrl+ '/admin/get-freights');
  };
  // getfreightByFilter() {
  //   return this._http.get( this.BesUrl+ '/admin/get-freights');
  // };
}
