import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-set-threshold',
  templateUrl: './set-threshold.component.html',
  styleUrls: ['./set-threshold.component.scss']
})
export class SetThresholdComponent implements OnInit {
  productList:any;
  categoriList:any;
  productId:any;
  categorieId:any;
  subCategorieId:any;
  subCategoriList:any;



  constructor(private _categorie: CategoryService,
    private loader: NgxSpinnerService) { }

  ngOnInit(): void {
    this._categorie.productList().subscribe((res:any) => {
      console.log(res);
      this.productList = res.result;
    })
  }

  selectProduct(event:any) {
    this.loader.show();
    this.productId = event.target.value;
    let apiurl = '/admin/get-category-list/'+this.productId;
    this._categorie.getMethod(apiurl).subscribe((res:any) => {
      this.loader.hide();
      console.log(res);
      this.categoriList = res.result;
    })
  }

  selectCat(event:any)  {
    this.loader.show();
    this.categorieId = event.target.value;
    let apiurl = '/admin/get-sub-category-list/'+this.categorieId;
    this._categorie.getMethod(apiurl).subscribe((res:any) => {
      this.loader.hide();
      this.subCategoriList = res.result;
      console.log(this.subCategoriList);
    })
  }
  subCategori(event:any) {
    this.subCategoriList = event.target.value;
    console.log(event.target.value);
  }
  getPrice(event:any) {
    console.log(event.target.value);
    let size = event.target.value;
    console.log(size);
    console.log(this.productId);
    console.log(this.categorieId);
    console.log(this.subCategorieId);
  }
}
