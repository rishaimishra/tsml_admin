import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-po-details',
  templateUrl: './po-details.component.html',
  styleUrls: ['./po-details.component.scss']
})
export class PoDetailsComponent implements OnInit {
  poNumber:any;
  poInfo:any;
  poDetails: any;


  constructor(private _route: ActivatedRoute,
    private _product: ProductsService,
    private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this._route.params.subscribe((param:any) => {
      if (param != null || param != '') {
        this.poNumber = param.id;
        this.getPoDetails();
      }
    })
  }

  getPoDetails() {
    this._spinner.show();
    let apiUrl = '/admin/get-po-details-admin/' +this.poNumber;
    this._product.getMethod(apiUrl).subscribe((res:any) => {
      this._spinner.hide();
      if (res.status == 1 && res.message == 'success') {
        this.poInfo = res.data;
        this.poDetails = res.result;
      }
    })
  }
}
