import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  prodName: string = "";
  prodDescription: string = "";
  categoryStatus: any;
  productId:any;
  
  constructor(private _product: ProductsService, private toaster: ToastrService,
    private spinner: NgxSpinnerService, private _route: ActivatedRoute, private _location:Location) { }

  ngOnInit(): void {

    this._product.getCurrentProduct(this._route.snapshot.params['id']).subscribe((prod:any) => {
      this.productId = prod.result.id;
      this.prodName = prod.result.product_name;
      this.prodDescription = prod.result.product_desc;
    })

  }
  goBack() {
    this._location.back();
  };

  selectStatus(event: any) {
    this.categoryStatus = event.target.value;
  };

  saveProduct() {
    this.spinner.show();
    let productReq = {
      "proId": this.productId,
      "pro_name": this.prodName,
      "pro_desc": this.prodDescription      
    };

    if (productReq) {
      this._product.updateProduct(productReq).subscribe((res:any) => {
        this.spinner.hide();
        this._location.back()
        if (res.status == 1) {
          this.toaster.success(res.message);
        }
      }, err => {
        console.log(err);
      })
    }
  }
}


