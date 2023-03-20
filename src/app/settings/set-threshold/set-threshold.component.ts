import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import { SettingsService } from 'src/app/service/settings.service';
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
  submited: boolean= false;
  loadedFile:any;



  constructor(private _categorie: CategoryService,
    private loader: NgxSpinnerService, private _router: Router,
    private _product: ProductsService, private _fb: FormBuilder,
    private _settings: SettingsService, private tostr: ToastrService) {
    this.setthresholdForm = this._fb.group({
      user_id: [''],
      pro_id: ['', Validators.required],
      cat_id: ['', Validators.required],
      sub_cat_id: ['', Validators.required],
      size: ['', Validators.required],
      BPT_Price: ['', Validators.required],
      Price_Premium: ['', Validators.required],
      Misc_Expense: ['', Validators.required],
      Interest_Rate: ['', Validators.required],
      CAM_Discount: ['', Validators.required],
      // gst_per: [''],
      Price_Premium_sing: ['', Validators.required]
    })
  }
  get form () {
    return this.setthresholdForm.controls;
  };

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
    // this.loader.show();
    this.productId = event.target.value;
    let apiurl = '/admin/get-category-list/' + this.productId;
    this._categorie.getMethod(apiurl).subscribe((res: any) => {
      // this.loader.hide();
      this.categoriList = res.result;
      this.selectCat(this.productId);
    })
  };

  selectCat(event: any) {
    // this.loader.show();
    this.categorieId = event.target.value;
    let apiurl = '/admin/get-sub-category-list/' + this.categorieId;
    this._categorie.getMethod(apiurl).subscribe((res: any) => {
      // this.loader.hide();
      this.subCategoriList = res.result;
      this.subCategori(this.subCategoriList)
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
    this.submited = true;
    if(this.setthresholdForm.invalid) {
      return;
    }
    this.loader.show();
    this.setthresholdForm.value['pro_id'] = this.productId;
    this.setthresholdForm.value['cat_id'] = this.categorieId;
    this.setthresholdForm.value['sub_cat_id'] = this.subCategorySize;
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
  };
  selectFile(event:any) {
    this.loadedFile = event.target.files[0];
  };

  uploadXcl() {
    const fileData = new FormData();
    if(this.loadedFile == undefined) {
      this.tostr.error('File is required!', 'Sorry');
      return;
    }
    this.loader.show();
    fileData.append('pricefile', this.loadedFile);
    this._settings.importAsExel(fileData).subscribe((res:any) => {
      this.loader.hide();
      if(res.message == 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Price uploaded successfully!',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if(res.message == 'error') {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: res.result,
        })
      }
    }, err => {
      console.log(err);
      this.loader.hide();
    })
  }
}
