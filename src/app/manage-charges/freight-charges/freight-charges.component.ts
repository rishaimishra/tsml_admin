import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/service/category.service';

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
    private _spinner: NgxSpinnerService) { }

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
  }
  frieghtChargeFilter() {
    this._spinner.show();
    var url = '/admin/get-freights?pickupfrom' + '=' + this.pickupValue + '&' + 'status' + '=' + this.status;
    this._category.getMethod(url).subscribe((res: any) => {
      this.freightCharges = res.result;
      this._spinner.hide();
    })
  }
}
