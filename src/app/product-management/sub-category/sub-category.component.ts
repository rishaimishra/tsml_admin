import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  subCtgryList: any = [];
  p: number = 1;


  
  constructor(private _category: CategoryService,
    private _spiner: NgxSpinnerService, private _router: Router) { }

  ngOnInit(): void {
    this.subCategoryList();
  }

  subCategoryList () {
    this._spiner.show();
    this._category.getSubCatetoryList().subscribe((res: any) => {
      if (res.status == 1) {
        this.subCtgryList = res.result;
        this._spiner.hide();
      }
      if (res.status == 'Authorization Token not found') {
        this._router.navigate(['']);
        this._spiner.hide();
      }
    }, err => {
      console.log(err);
      this._spiner.hide();
    })
  }
}
