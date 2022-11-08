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
  subCategoriList: any;


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
      CAM_Discount: ['']
    })
  }

  ngOnInit(): void {
    this.loader.show();
    this._categorie.productList().subscribe((res: any) => {
      this.loader.hide();
      if (res.message == 'success.' && res.status == 1) {
        console.log(res);
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
      console.log(res);
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
      console.log(this.subCategoriList);
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
      // if (res.status == 1 && res.message == 'No data found') {
      //   Swal.fire({
      //     title: 'oops',
      //     text: "Basic Price Not Availble",
      //     icon: 'warning',
      //     showCancelButton: false,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'OK'
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       Swal.fire(
      //         'Deleted!',
      //         'Your file has been deleted.',
      //         'success'
      //       )
      //     }
      //   })
      // }
    })
  };

  saveThreshold() {
    this.loader.show();
    this.setthresholdForm.value['pro_id'] = this.productId;
    this.setthresholdForm.value['cat_id'] = this.categorieId;
    this.setthresholdForm.value['sub_cat_id'] = this.subCategoriList;
    this.setthresholdForm.value['size'] = this.productSize;
    this._product.setThreshold(this.setthresholdForm.value).subscribe((res:any) => {
      this.loader.hide();
      console.log(res);
      if (res.status == 1) {
        Swal.fire(
          'Success',
          'Price Components Added Successfully',
          'success'
        )
      } else {
        console.log(res.message);
      }
    })
  }
}
