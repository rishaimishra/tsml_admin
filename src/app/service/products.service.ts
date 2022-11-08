import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private BesUrl = environment.apiEndpointBase;

  constructor(private _http: HttpClient) { }

  getMethod(url_paremter: any) {
    return this._http.get(this.BesUrl + url_paremter);
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

  getthresholdList() {
    return this._http.get(this.BesUrl + '/admin/get-threshold-price-admin');
  };

  updateThreshold(reqParameter: any) {
    return this._http.post(this.BesUrl + '/admin/update-threshold-price-admin', reqParameter);
  };

  //http://localhost/TSML/api/admin/get-threshold-price-details-admin/1

}
