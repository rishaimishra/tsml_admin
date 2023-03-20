import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-freight-charges',
  templateUrl: './freight-charges.component.html',
  styleUrls: ['./freight-charges.component.scss']
})
export class FreightChargesComponent implements OnInit {
  freightCharges: any;
  pickupValue: string = '';
  status: any;
  p: number = 1;

  constructor(private _category: CategoryService,
    private _spinner: NgxSpinnerService, private _product: ProductsService,
    private _toaster: ToastrService) { }

  ngOnInit(): void {
    this.getAllFreightCharges();
    
  }

  getAllFreightCharges() {
    this._spinner.show();
    this._category.getfreightCharges().subscribe((res:any) => {
      if (res.message == 'success') {
        this.freightCharges = res.result;
        this._spinner.hide();
      }
      this._spinner.hide();
    }, err => {
      console.log(err);
      this._spinner.hide();
    })
  };

  statusValue(event: any) {
    this.status = event.target.value;
  };

  frieghtChargeFilter() {
    this._spinner.show();
    var url = '/admin/get-freights?pickupfrom' + '=' + this.pickupValue + '&' + 'status' + '=' + this.status;
    this._category.getMethod(url).subscribe((res: any) => {
      this.freightCharges = res.result;
      this._spinner.hide();
    })
  };

  deleteFreight(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._spinner.show();
        let apiKey = '/admin/delete-freight';
        let apiUrl = apiKey+ '/'+ id;
        this._product.getMethod(apiUrl).subscribe((res: any) => {
          if (res.status == 1 && res.message == 'Freight deleted successfully.') {
            this._spinner.hide();
            // this._toaster.success('Deleted');
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getAllFreightCharges();
          } else {
            this._toaster.error(res.message);
            this._spinner.hide();
          }
        })
      }
    })
  }
}
