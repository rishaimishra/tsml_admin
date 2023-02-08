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
    // this._route.params.subscribe((param:any) => {
    //   console.log(param.id);
    //   let apiUrl = '/admin/edit-product/' + param.id
    //   this._product.getMethod(apiUrl).subscribe((res:any) => {
    //     console.log(res.result)
    //     if(res.status == 1) {
    //       this.productId = res.result['id'];
    //       this.prodName = res.result['product_name'],
    //       this.proddescription = res.result['product_desc']
    //     }
    //   })
    // })

    this._product.getCurrentProduct(this._route.snapshot.params['id']).subscribe((prod:any) => {
      // const newProd:any = prod;
      // console.log(prod.result.product_name)
      // console.log(prod)
      this.productId = prod.result.id;
      this.prodName = prod.result.product_name;
      this.prodDescription = prod.result.product_desc;
    })

    // this._product.updateProduct(this._route.snapshot.params['id']).subscribe((res) => {
    //   console.log(res)
    // })
  }
  goBack() {
    this._location.back();
  };

  // goBack() {
  //   this._location.back();
  // };

  selectStatus(event: any) {
    this.categoryStatus = event.target.value;
  };

  saveProduct() {
    this.spinner.show();
    let productReq = {
      "pro_id": this.productId,
      "pro_name": this.prodName,
      "pro_desc": this.prodDescription      
    };
// https://beas.in/mje-shop/api/admin/update-product/1
    if (productReq) {
      this._product.updateProduct(productReq).subscribe((res:any) => {
        this.spinner.hide();
        console.log(res);
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


