import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  prodName: any;
  proddescription: any;
  categoryStatus: any;
  
  constructor(private _product: ProductsService, private _location: Location,
    private _category: CategoryService, private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
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
      "pro_name": this.prodName,
      "pro_desc": this.proddescription      
    };

    if (productReq) {
      this._product.storeProduct(productReq).subscribe((res:any) => {
        this.spinner.hide();
        console.log(res);
        if (res.status == 1) {
          this.toaster.success(res.message);
        }
      }, err => {
        console.log(err);
      })
    }
  }
}

