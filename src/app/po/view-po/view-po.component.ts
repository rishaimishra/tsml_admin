import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-view-po',
  templateUrl: './view-po.component.html',
  styleUrls: ['./view-po.component.scss']
})
export class ViewPoComponent implements OnInit {
  poViewItems: any;
  searchPoForm: FormGroup
  submitted: boolean = false;
  basUrlPath = environment.apiEndpointBase;


  constructor(private _product: ProductsService,
    private _spinner: NgxSpinnerService, private _fb: FormBuilder) {
    this.searchPoForm = this._fb.group({
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      po_no: [''],
      customer_name: [''],
      rfq_no: [''],
      categorys: ['']
    })
  }

 get f(): { [key: string]: AbstractControl } {
    return this.searchPoForm.controls;
  }

  ngOnInit(): void {
    this.getPo();
  }
  
  selectEndDate() {
    const toDate = this.searchPoForm.value['to_date'];
    const [year, month, day] = toDate.split('/');
    const result = [day, month, year].join('');
    this.searchPoForm.value['to_date'] = result;
  };
  rseteSearch() {
    this.getPo();
  };

  submitSearch() {
    this.submitted = true;
    this._spinner.show();
    const startDate = this.searchPoForm.value['from_date'];
    const [year, month, day] = startDate.split('/');
    const result = [day, month, year].join('');
    this.searchPoForm.value['from_date'] = result;


    this._product.getPoList(this.searchPoForm.value).subscribe((res: any) => {
      this._spinner.hide();
      if (res.message == 'success' && res.status == 1) {
        this.poViewItems = res.result;
      }
      else {
        Swal.fire({
          title: 'Opps!',
          icon: 'info',
          text: res.message,
          focusConfirm: false,
        })
        this.poViewItems = [];
      }
    })
  }

  getPo() {
    this._spinner.show();
    let poReq = {
      "from_date": '',
      "to_date": '',
      "po_no": '',
      "customer_name": '',
      "rfq_no": '',
      "categorys": ''
    }
    this._product.getPoList(poReq).subscribe((res: any) => {
      this._spinner.hide();
      if (res.message == 'success' && res.status == 1) {
        this.poViewItems = res.result;
      }
    })
  }
}
