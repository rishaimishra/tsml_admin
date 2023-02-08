import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryItems: any = [];



  constructor(private _category: CategoryService,
    private _spiner: NgxSpinnerService, private _router: Router) { }

  ngOnInit(): void {
    this.categoryList();
  }

  categoryList() {
    this._spiner.show();
    this._category.getCatetoryList().subscribe((res: any) => {
      if (res.status == 1) {
        this.categoryItems = res.result;
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

  toggleStatus(catStatus:number, catId:number){
    this._spiner.show();
    if(catStatus === 1){
      // console.log("Changed to inactive!");
      this._category.inactiveCategory(catId).subscribe((res:any) => {
        // If token has expire
        if (res.status == 'Token has Expired') {
          this._router.navigate(['']);
          this._spiner.hide();
          // return;
        }
        console.log(res.message)
        this._spiner.hide();
        // this._router.navigateByUrl('/product-management/product-list')
        this.categoryList();
      });
    } else {
      // console.log("changed to active");
      this._category.activeCategory(catId).subscribe((res:any) => {
        // If token has expire
        if (res.status == 'Token has Expired') {
          this._router.navigate(['']);
          this._spiner.hide();
          // return;
        }
        console.log(res.message)
        this._spiner.hide();
        // this._router.navigateByUrl('/product-management/product-list')
        this.categoryList();
      });
    }
  }
}
