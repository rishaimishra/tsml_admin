import { Component, OnInit } from '@angular/core';
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
    private _spiner: NgxSpinnerService) { }

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
    }, err => {
      console.log(err);
      this._spiner.hide();
    })
  }
}
