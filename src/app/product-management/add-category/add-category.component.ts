import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryName: any;
  description: any;
  categoryStatus: any;
  productName:any;
  productID:any;
  selectedProduct:any;


  url:any;
  categoryItems: any = [];
  productItems: any = [];
  
  constructor(private _product: ProductsService, private _location: Location,
    private _category: CategoryService, private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }


  ngOnInit(): void {

    this.categoryList();
    this.ProductList();
  }
 
  

   onselectFile(e:any){
      if(e.target.files){
        var reader=new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(event:any)=>{
          this.url=event.target.result;
        }
      }
   }

  categoryList(){
    this._category.getCatetoryList().subscribe((data:any)=>{
      this.categoryItems=data.result;
      console.log(this.categoryItems);
        });
  }

  ProductList() {
    this._product.getProductList().subscribe((data:any)=>{
      this.productItems = data.result;
      this.selectedProduct = this.productItems.find((prod:any) => {
        return prod.product_title === this.productName;
      })
      // console.log(this.productItems);
      });
  }

  goBack() {
    this._location.back();
  };


  selectStatus(event: any) {
    this.categoryStatus = event.target.value;
  };

  selectProductTitle(event: any) {
    this. productName = event.target.value;
  };

  selectCategoyName(event:any)
  {
    this.categoryName = event.target.value;
  }

 
  saveCategory() {
    this.spinner.show();
    let categoryReq = {
      "product_id":this.selectedProduct.product_id,
      "cat_name": this.categoryName,
      "cat_dese": this.description,
      // "status": this.categoryStatus,
      "primary_image":this.url

    };
    if (categoryReq) {
      this._category.storeCategory(categoryReq).subscribe((res:any) => {
        console.log(res);
        if(res.status == 1 && res.message != 'error') {
          this.toaster.success(res.message);
          this.spinner.hide();
        }
        if(res.status != 1 || res.message == 'errors') {
          this.toaster.error(res.errors.cat_name);
          this.spinner.hide();
        }
      }, err => {
        console.log(err);
        this.spinner.hide();
      })
    }
  }

}