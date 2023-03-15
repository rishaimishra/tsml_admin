import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-set-threshold',
  templateUrl: './set-threshold.component.html',
  styleUrls: ['./set-threshold.component.scss']
})
export class SetThresholdComponent implements OnInit {
  productList: any;
  categoriList: any;
  setthresholdForm: FormGroup;
  productId: any;
  productSize:any;
  categorieId: any;
  subCategorieId: any;
  subCategoriList: any = [];
  subCategorySize:any = [];
  sizes:any = [];



  constructor(private _categorie: CategoryService,
    private loader: NgxSpinnerService, private _router: Router,
    private _product: ProductsService, private _fb: FormBuilder) {
    this.setthresholdForm = this._fb.group({
      user_id: [''],
      pro_id: [''],
      cat_id: [''],
      sub_cat_id: [''],
      size: [''],
      BPT_Price: [''],
      Price_Premium: [''],
      Misc_Expense: [''],
      Interest_Rate: [''],
      CAM_Discount: [''],
      // gst_per: [''],
      Price_Premium_sing: ['']
    })
  }

  ngOnInit(): void {
    this.loader.show();
    this._categorie.productList().subscribe((res: any) => {
      this.loader.hide();
      if (res.message == 'success.' && res.status == 1) {
        this.productList = res.result;
      }
      if (res.status == 'Token has Expired') {
        this._router.navigate(['']);
      }
    })
  }

  selectProduct(event: any) {
    this.loader.show();
    this.productId = event.target.value;
    let apiurl = '/admin/get-category-list/' + this.productId;
    this._categorie.getMethod(apiurl).subscribe((res: any) => {
      this.loader.hide();
      this.categoriList = res.result;
    })
  };

  selectCat(event: any) {
    this.loader.show();
    this.categorieId = event.target.value;
    let apiurl = '/admin/get-sub-category-list/' + this.categorieId;
    this._categorie.getMethod(apiurl).subscribe((res: any) => {
      this.loader.hide();
      this.subCategoriList = res.result;
    })
  };
  subCategori(event: any) {
    this.subCategorySize = event.target.value;
    let apiUrl = '/admin/get-subcategory-size-byid/'+event.target.value;
    this._product.getMethod(apiUrl).subscribe((res:any) => {
      if (res.status == 1 && res.message == 'success.') {
        this.sizes = res.result[0];
      }
    })
  };


  saveThreshold() {
    this.loader.show();
    this.setthresholdForm.value['pro_id'] = this.productId;
    this.setthresholdForm.value['cat_id'] = this.categorieId;
    this.setthresholdForm.value['sub_cat_id'] = this.subCategorySize;
    // this.setthresholdForm.value['size'] = this.productSize;
    this._product.setThreshold(this.setthresholdForm.value).subscribe((res:any) => {
      this.loader.hide();
      if (res.status == 1) {
        Swal.fire(
          'Success',
          'Price Components Added Successfully',
          'success'
        )
      }
    }, err => {
      console.log(err);
      this.loader.hide();
    })
  }
}
