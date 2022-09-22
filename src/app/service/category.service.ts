import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private BesUrl = environment.apiEndpointBase;
  constructor(private _http: HttpClient) { }

  getCatetoryList() {
    return this._http.get( this.BesUrl+ '/admin/category-list');
  };
  
  getSubCatetoryList() {
    return this._http.get( this.BesUrl+ '/admin/sub-category-list');
  };
  
}
