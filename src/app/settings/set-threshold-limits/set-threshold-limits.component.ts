import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-set-threshold-limits',
  templateUrl: './set-threshold-limits.component.html',
  styleUrls: ['./set-threshold-limits.component.scss']
})
export class SetThresholdLimitsComponent implements OnInit {
  thresholdItems:any;
  p: number = 1;


  constructor(private _products: ProductsService,
    private loader: NgxSpinnerService, private _router: Router) { }

  ngOnInit(): void {
    this.thresholdPrice();
  }

  thresholdPrice() {
    this.loader.show();
    this._products.getthresholdList().subscribe((res:any) => {
      this.loader.hide();
      if (res.status == 1 && res.message == 'success') {
        this.thresholdItems = res.result;
      }
      if (res.status == 'Token has Expired') {
        this._router.navigate(['']);
      }
    }, err => {
      console.log(err);
      this.loader.hide();
    })
  }
}
