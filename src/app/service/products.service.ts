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
  // https://beas.in/mje-shop/api/admin/store-freight
  storeFrieght(url_paremter: any) {
    return this._http.post(this.BesUrl + '/admin/store-freight', url_paremter);
  };

  storeDailyProd(reqParameter: any) {
    return this._http.post(this.BesUrl + '/admin/prod-qty-upload-admin', reqParameter);
  };
}
