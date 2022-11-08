import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-freight-charges',
  templateUrl: './add-freight-charges.component.html',
  styleUrls: ['./add-freight-charges.component.scss']
})
export class AddFreightChargesComponent implements OnInit {
  freightCharges: any;
  states: any;
  freightCharge: any;
  pickUp: any;
  pickLocation: any;
  status: any;
  destinationLocation:any;


  constructor(private _category: CategoryService,
     private _product: ProductsService, private _router: Router,
    private _spinner: NgxSpinnerService, private toater: ToastrService,
    private _location: Location) { }

  ngOnInit(): void {
    this.getAllFreightCharges();
    this.getState();
  }

  selectDestination(event:any) {
    this.destinationLocation = event.target.value;
  }
  pickUpfrom(event: any) {
    this.pickUp = event.target.value;
  };
  pickupLocation(event: any) {
    this.pickLocation = event.target.value;
  };
  selectStatus(event: any) {
    this.status = event.target.value;
  };

  saveFreight() {
    this._spinner.show();
    let freightReq = {
      "pickup_from": this.pickUp,
      "pickup_location": this.pickLocation,
      "destation_location": this.destinationLocation,
      "freight_charges": this.freightCharge,
      "status": this.status,
    };

      this._product.storeFrieght(freightReq).subscribe((res: any) => {
        this._spinner.hide();
        if(res.message == 'New freights added successfully') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Added successully',
            showConfirmButton: false,
            timer: 1500
          })
          
          this.getAllFreightCharges();
        } 
        if (res.message == 'error' && res.status == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'All field are required!',
          })
          this._spinner.hide();
        }
      }, err => {
        console.log(err);
        this._spinner.hide();
        // this.toater.success(res.result);
      })
    
  }
  goBack() {
    this._location.back();
  }
  getAllFreightCharges() {
    this._spinner.show();
    this._category.getfreightCharges().subscribe((res:any) => {
      if (res.message == 'success') {
        this.freightCharges = res.result;
        this._spinner.hide();
      }
      if (res.status == 'Token has Expired') {
        this._router.navigate(['']);
      }
      this._spinner.hide();
    }, err => {
      console.log(err);
    })
  }
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
          console.log(res);
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
            this.toater.error(res.message);
            this._spinner.hide();
          }
        })
      }
    })
  }
  getState() {
    this.states = [
      {
        key: 'AN',
        name: 'Andaman and Nicobar Islands',
      },
      {
        key: 'AP',
        name: 'Andhra Pradesh',
      },
      {
        key: 'AR',
        name: 'Arunachal Pradesh',
      },
      {
        key: 'AS',
        name: 'Assam',
      },
      {
        key: 'BR',
        name: 'Bihar',
      },
      {
        key: 'CG',
        name: 'Chandigarh',
      },
      {
        key: 'CH',
        name: 'Chhattisgarh',
      },
      {
        key: 'DH',
        name: 'Dadra and Nagar Haveli',
      },
      {
        key: 'DD',
        name: 'Daman and Diu',
      },
      {
        key: 'DL',
        name: 'Delhi',
      },
      {
        key: 'GA',
        name: 'Goa',
      },
      {
        key: 'GJ',
        name: 'Gujarat',
      },
      {
        key: 'HR',
        name: 'Haryana',
      },
      {
        key: 'HP',
        name: 'Himachal Pradesh',
      },
      {
        key: 'JK',
        name: 'Jammu and Kashmir',
      },
      {
        key: 'JH',
        name: 'Jharkhand',
      },
      {
        key: 'KA',
        name: 'Karnataka',
      },
      {
        key: 'KL',
        name: 'Kerala',
      },
      {
        key: 'LD',
        name: 'Lakshadweep',
      },
      {
        key: 'MP',
        name: 'Madhya Pradesh',
      },
      {
        key: 'MH',
        name: 'Maharashtra',
      },
      {
        key: 'MN',
        name: 'Manipur',
      },
      {
        key: 'ML',
        name: 'Meghalaya',
      },
      {
        key: 'MZ',
        name: 'Mizoram',
      },
      {
        key: 'NL',
        name: 'Nagaland',
      },
      {
        key: 'OR',
        name: 'Odisha',
      },
      {
        key: 'PY',
        name: 'Puducherry',
      },
      {
        key: 'PB',
        name: 'Punjab',
      },
      {
        key: 'RJ',
        name: 'Rajasthan',
      },
      {
        key: 'SK',
        name: 'Sikkim',
      },
      {
        key: 'TN',
        name: 'Tamil Nadu',
      },
      {
        key: 'TS',
        name: 'Telangana',
      },
      {
        key: 'TR',
        name: 'Tripura',
      },
      {
        key: 'UK',
        name: 'Uttar Pradesh',
      },
      {
        key: 'UP',
        name: 'Uttarakhand',
      },
      {
        key: 'WB',
        name: 'West Bengal',
      },
    ];
  }
}
