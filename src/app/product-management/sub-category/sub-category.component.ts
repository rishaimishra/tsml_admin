import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/service/category.service';
import { SearchService } from 'src/app/service/search.service';
import {} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
  providers:[SearchService]
})
export class SubCategoryComponent implements OnInit {
  subCtgryList: any = [];
  p: number = 1;
  filteredList: any = [];
  searchText:string = "";
  catStatus: string ="1";

  
  constructor(private _category: CategoryService,
    private _spiner: NgxSpinnerService, private _router: Router, private searchService:SearchService) { }

  ngOnInit(): void {
    this.subCategoryList();
  }

  // searchFunc(){
  //   this.searchService.enteredTextSearchEvent.emit(this.searchText);
  // }
 

  selectOption(event:any){
    this.catStatus = event.target.value;
    this.filterNow()
  }

  subCategoryList () {
    this._spiner.show();
    this._category.getSubCatetoryList().subscribe((res: any) => {
      if (res.status == 1) {
        this.subCtgryList = res.result;
        this.filterNow();
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

  filterNow(){
    // console.log(this.searchText);
    // console.log(this.catStatus)
    this.filteredList = [];
    if(this.searchText == "" && this.catStatus=="1"){
      for(let cat of this.subCtgryList){
        if(cat.sub_category_status == "1"){
          this.filteredList.push(cat);
        }
      }
    }
    if(this.searchText == "" && this.catStatus=="2"){
      for(let cat of this.subCtgryList){
        if(cat.sub_category_status == "2"){
          this.filteredList.push(cat);
        }
      }
    }
    if(this.searchText !== ""){
      for(let cat of this.subCtgryList){
        if(cat.sub_category_status == this.catStatus && cat.sub_category_name.toLowerCase().includes(this.searchText.toLowerCase())){
          this.filteredList.push(cat);
        }
      }
    }

    // console.log(this.filteredList.length)
  }

}
