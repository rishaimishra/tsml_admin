import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/service/products.service';
import * as $ from 'jquery';
import { CategoryService } from 'src/app/service/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-set-threshold-limits',
  templateUrl: './set-threshold-limits.component.html',
  styleUrls: ['./set-threshold-limits.component.scss']
})
export class SetThresholdLimitsComponent implements OnInit {
  thresholdItems: any;
  p: number = 1;
  product:any = [];
  productId: any;
  productSize:any;
  categorieId: any;
  subCategorieId: any;
  subCategoriList: any = [];
  categoriList:any = [];
  searchForm: FormGroup;
  submited: boolean = false;

  constructor(private _products: ProductsService,
    private loader: NgxSpinnerService, private _router: Router,
    private _categorie: CategoryService,
    private _fb: FormBuilder) 
    { 
      this.searchForm = this._fb.group({
        pro_id: ['', Validators.required],
        catid: ['', Validators.required],
        subcatid: ['', Validators.required],
        status: ['', Validators.required],

      })
    }
    get form() {
      return this.searchForm.controls;
    }

  ngOnInit(): void {
    this.prodList();
    this.thresholdPrice();
  }

  thresholdPrice() {
    this.loader.show();
    this._products.getthresholdList(this.searchForm.value).subscribe((res: any) => {
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
  };

  prodList() {
    this._products.getProductList().subscribe((data: any) => {
      this.product = data.result;
    });
  };

  selectCate(event: any) {
    this.loader.show();
    this.productId = event.target.value;
    let apiurl = '/admin/get-category-list/' + this.productId;
    this._categorie.getMethod(apiurl).subscribe((res: any) => {
      this.loader.hide();
      this.categoriList = res.result;
    })
  };

  selectSubCat(event: any) {
    this.categorieId = event.target.value;
    let apiurl = '/admin/get-sub-category-list/' + this.categorieId;
    this._categorie.getMethod(apiurl).subscribe((res: any) => {
      this.subCategoriList = res.result;
    })
  };


  searchBy() {
    this.submited = true;
    if(this.searchForm.invalid) {
      return;
    }
    
    this.loader.show();
    this._products.getthresholdList(this.searchForm.value).subscribe((res: any) => {
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
