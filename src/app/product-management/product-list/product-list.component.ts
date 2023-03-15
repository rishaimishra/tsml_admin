import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productItems: any = [];
  prod_id:any;
  p: number = 1;
  pid: any;
  filteredList: any = [];
  searchText:string = "";
  prodStatus: string ="1";
  

  constructor(private _product:ProductsService,
    private _spiner: NgxSpinnerService, private _router: Router) { }

  ngOnInit(): void {
    this.ProductList();
  }

  productList() {
    throw new Error('Method not implemented.');
  }

  selectOption(event:any){
    this.prodStatus = event.target.value;
    this.filterNow()
  }

  ProductList() {
    this._spiner.show();
    this. _product.getProductList().subscribe((res: any) => {
      if (res.status == 1) {
        this.productItems = res.result;
        this._spiner.hide();
        this.filterNow();
      }
      if (res.status == 'Token has Expired') {
        this._router.navigate(['']);
        this._spiner.hide();
      }
    }, err => {
      console.log(err);
      this._spiner.hide();
    })
  }

  filterNow(){
    this.filteredList = [];
    if(this.searchText == "" && this.prodStatus=="1"){
      for(let prod of this.productItems){
        if(prod.product_status == "1"){
          this.filteredList.push(prod);
        }
      }
    }
    if(this.searchText == "" && this.prodStatus=="2"){
      for(let prod of this.productItems){
        if(prod.product_status == "2"){
          this.filteredList.push(prod);
        }
      }
    }
    if(this.searchText !== ""){
      for(let prod of this.productItems){
        if(prod.product_status == this.prodStatus && prod.product_title.toLowerCase().includes(this.searchText.toLowerCase())){
          this.filteredList.push(prod);
        }
      }
    }
    console.log(this.filteredList.length)
  }


  toggleStatus(currentProductStatus:number, prodId:number){
    // console.log(currentProductStatus, prodId)
    this._spiner.show();
    if(currentProductStatus === 1){
      // console.log("Changed to inactive!");
      this._product.inactiveProduct(prodId).subscribe((res:any) => {
        if (res.status == 'Token has Expired') {
          this._router.navigate(['']);
          this._spiner.hide();
          return;
        }
        console.log(res.message)
        this._spiner.hide();
        // this._router.navigateByUrl('/product-management/product-list')
        this.ProductList();
      });
    } else {
      console.log("changed to active");
      this._product.activeProduct(prodId).subscribe((res:any) => {
        if (res.status == 'Token has Expired') {
          this._router.navigate(['']);
          this._spiner.hide();
          return;
        }
        // console.log(res.message)
        this._spiner.hide();
        // this._router.navigateByUrl('/product-management/product-list')
        this.ProductList();
      });
    }
  }

  // deleteProduct(id: any) {
  //   if(confirm('Do u want to delete this product')){
      
  //   }
  //  }


  EditProduct(product_id:any)
  {
    console.log(this.productItems);
     this._spiner.show();
     this. _product.editProductList().subscribe((res: any) => {
       if (res.status == 1) {
         this.productItems = res.result;
         console.log(this.productItems);
         this._spiner.hide();
       }

       if (res.status == 'Token has Expired') {
         this._router.navigate(['']);
         this._spiner.hide();
       }
     }, err => {
       console.log(err);
       this._spiner.hide();
     })
  }
}
