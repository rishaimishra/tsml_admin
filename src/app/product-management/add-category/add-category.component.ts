import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  saveCategory() {
    this.spinner.show();
    let categoryReq = {
      "product_id": '2',
      "cat_name": this.categoryName,
      "cat_dese": this.description,
      "status": this.categoryStatus
    };

    if (categoryReq) {
      this,this._category.storeCategory(categoryReq).subscribe((res:any) => {
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
