import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-freight-charges',
  templateUrl: './freight-charges.component.html',
  styleUrls: ['./freight-charges.component.scss']
})
export class FreightChargesComponent implements OnInit {
  freightCharges: any;
  pickupValue: string = '';
  status: any;

  constructor(private _category: CategoryService,
    private _spinner: NgxSpinnerService, private _product: ProductsService,
    private _toaster: ToastrService) { }

  ngOnInit(): void {
    this.getAllFreightCharges();
  }

  getAllFreightCharges() {
    this._spinner.show();
    this._category.getfreightCharges().subscribe((res:any) => {
      if (res.message == 'success') {
        this.freightCharges = res.result;
        this._spinner.hide();
      }
      this._spinner.hide();
    }, err => {
      console.log(err);
    })
  }
  statusValue(event: any) {
    this.status = event.target.value;
    console.log(this.status);
  }
  frieghtChargeFilter() {
    this._spinner.show();
    var url = '/admin/get-freights?pickupfrom' + '=' + this.pickupValue + '&' + 'status' + '=' + this.status;
    this._category.getMethod(url).subscribe((res: any) => {
      this.freightCharges = res.result;
      this._spinner.hide();
    })
  };

  deleteFreight(id: any) {
    this._spinner.show();
    let apiKey = '/admin/delete-freight';
    let apiUrl = apiKey+ '/'+ id;
    this._product.getMethod(apiUrl).subscribe((res: any) => {
      console.log(res);
      if (res.status == 1 && res.message == 'Freight deleted successfully.') {
        this._spinner.hide();
        this._toaster.success('Deleted');
        this.getAllFreightCharges();
      } else {
        this._toaster.error(res.message);
        this._spinner.hide();
      }
    })
  }
}
