import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-threshold-price',
  templateUrl: './edit-threshold-price.component.html',
  styleUrls: ['./edit-threshold-price.component.scss']
})
export class EditThresholdPriceComponent implements OnInit {
  
  productList: any;
  categoriList: any;
  setthresholdForm: FormGroup;
  productId: any;
  productSize:any;
  categorieId: any;
  subCategorieId: any;
  subCategoriList: any = [];

  editdataInfo:any = [];
  basicPrice:any;
  premiumPrice:any;
  productName:any;
  miscExp:any;
  InterestRate:any;
  kamDiscount:any;

  price:any;



  constructor(private _categorie: CategoryService,
    private loader: NgxSpinnerService, private _router: Router,
    private _product: ProductsService, private _fb: FormBuilder,
    private _route: ActivatedRoute) {
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
      CAM_Discount: ['']
    })
  }

  ngOnInit(): void {
    this._route.params.subscribe((param:any) => {
      this.thresholdDetails(param.id)
    })

    this._categorie.productList().subscribe((res: any) => {
      if (res.message == 'success.' && res.status == 1) {
        this.productList = res.result;
      }
      if (res.status == 'Token has Expired') {
        this._router.navigate(['']);
      }

    })

  }

  thresholdDetails(thresholdId:any) {
    let apiUrl = '/admin/get-threshold-price-details-admin/'+thresholdId;
    this._product.getMethod(apiUrl).subscribe((res:any) => {
      if (res.status == 1 && res.message == 'success.') {
        this.editdataInfo = res.result;
        let pId = this.editdataInfo.cat_id;
        // this.selectCat(pId);
        console.log('data',pId);
      }
    })
  }
  selectProduct(event: any) {
    // this.loader.show();
    this.productId = event.target.value;
    let apiurl = '/admin/get-category-list/' + this.productId;
    this._categorie.getMethod(apiurl).subscribe((res: any) => {
      this.loader.hide();
      this.categoriList = res.result;
    })
  };

  selectCat(event: any) {
    // this.loader.show();
    this.categorieId = event.target.value;
    let apiurl = '/admin/get-sub-category-list/' + this.categorieId;
    this._categorie.getMethod(apiurl).subscribe((res: any) => {
      this.loader.hide();
      this.subCategoriList = res.result;
    })
  };
  subCategori(event: any) {
    this.subCategoriList = event.target.value;

  };
  getPrice(event: any) {
    let size = event.target.value;
    this.productSize = event.target.value;
    let basicPrice = {
      "pro_id": this.productId,
      "cat_id": this.categorieId,
      "sub_cat_id": this.subCategoriList,
      "size": size
    };

    this._product.showBasicPrice(basicPrice).subscribe((res: any) => {
      console.log(res);
    })
  };

  saveThreshold() {
    console.log(this.editdataInfo);
    if (this.editdataInfo[''] == null) {
      return;
    }
    return;
    this._product.updateThreshold(this.editdataInfo).subscribe((res:any) => {
      this.loader.hide();
      console.log(res);
      if (res.status == 1) {
        Swal.fire(
          'Success',
          'Price Components Updated Successfully',
          'success'
        )
      } else {
        console.log(res.message);
      }
    })
  }
}
