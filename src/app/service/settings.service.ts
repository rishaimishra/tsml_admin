import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private BesUrl = environment.apiEndpointBase;
  constructor(private _http: HttpClient) { }

  getSecurityQuestion(){
    return this._http.get(this.BesUrl + '/get_security_questions_admin');
  };

  postSecurityQuestion(question: any){
    return this._http.post( this.BesUrl+ '/store_security_question', question);
  };

  getCurrentQuestion(id:string){
    return this._http.put(this.BesUrl + '/edit_questions_admin/'+id,{})
  };

  postUpdatedQuestion(payload:any){
    return this._http.post(this.BesUrl + '/update_questions_admin',payload)
  };

  importAsExel(payload:any){
    return this._http.post(this.BesUrl + '/import-excel-threshold-price-admin',payload)
  };

  exportAsExel(){
    return this._http.get(this.BesUrl + '/export-excel-threshold-price-admin')
  }

  //http://localhost/tsml-8-repo/api/export-excel-threshold-price-admin
}
