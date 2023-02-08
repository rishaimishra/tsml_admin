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
  
  productList () {
    return this._http.get( this.BesUrl+ '/admin/get-product-list');
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

  storeCategory(url_paremter: any) {
    return this._http.post( this.BesUrl+ '/admin/store-category', url_paremter);
  };

  // http://localhost/TSML/api/admin/get-product-basic-price

  basicPriceOfProduct(url_paremter: any) {
    return this._http.post( this.BesUrl+ '/admin/get-product-basic-price', url_paremter);
  };
  // https://beas.in/mje-shop/api/admin/inactive-category/2
  activeCategory(catId:number){
    return this._http.get( this.BesUrl+ '/admin/active-category/'+ catId);
  }
  inactiveCategory(catId:number){
    return this._http.get( this.BesUrl+ '/admin/inactive-category/'+ catId);
  }
}
