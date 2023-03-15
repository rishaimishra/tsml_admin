import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productList() {
    throw new Error('Method not implemented.');
  }

  private BesUrl = environment.apiEndpointBase;

  constructor(private _http: HttpClient) { }

  getMethod(url_paremter: any) {
    return this._http.get(this.BesUrl + url_paremter);
  };

  putMethod(url_paremter: any) {
    return this._http.put(this.BesUrl, url_paremter);
  };
  storeFrieght(url_paremter: any) {
    return this._http.post(this.BesUrl + '/admin/store-freight', url_paremter);
  };

  storeDailyProd(reqParameter: any) {
    return this._http.post(this.BesUrl + '/admin/prod-qty-upload-admin', reqParameter);
  };

  showBasicPrice(reqParameter: any) {
    return this._http.post(this.BesUrl + '/admin/get-product-basic-price', reqParameter);
  };

  setThreshold(reqParameter: any) {
    return this._http.post(this.BesUrl + '/admin/store-pro-price', reqParameter);
  };

  getthresholdList(data:any): Observable<any> {
    return this._http.post(this.BesUrl + '/admin/get-threshold-price-admin', data);
  };

  updateThreshold(reqParameter: any) {
    return this._http.post(this.BesUrl + '/admin/update-threshold-price-admin', reqParameter);
  };

  getPoList(reqParameter: any) {
    return this._http.post(this.BesUrl + '/admin/get-po-list-admin', reqParameter);
  };
  customerUpload(reqParameter: any) {
    return this._http.post(this.BesUrl + '/user-bulk-upload', reqParameter);
  };

  getProductList() {
    return this._http.get(this.BesUrl+ '/admin/product-list');
  };

  storeProduct(url_paremter: any) {
    return this._http.post( this.BesUrl+ '/admin/store-product', url_paremter);
  };

  editProductList() {
    return this._http.get(this.BesUrl+ '/admin/edit-product');
  };

  getCurrentProduct(id:string){
    return this._http.get(this.BesUrl+ '/admin/edit-product/'+id);
  }

  updateProductList(){
    return this._http.get(this.BesUrl+ '/admin/edit-product');
  };

//https://beas.in/mje-shop/api/admin/update-product/1

  updateProduct(url_paremter: any) {
    return this._http.post( this.BesUrl+ '/admin/update-product/'+url_paremter.pro_id, url_paremter);
  };

  activeProduct(id:number){
    return this._http.get( this.BesUrl+ '/admin/active-product/'+id);
  }
  inactiveProduct(id:number){
    return this._http.get( this.BesUrl+ '/admin/inactive-product/'+id);
  }
  // https://beas.in/mje-shop/api/admin/active-product/11

  // Delete Restaurant using Delete method
 

}
