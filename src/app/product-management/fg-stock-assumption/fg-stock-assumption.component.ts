import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fg-stock-assumption',
  templateUrl: './fg-stock-assumption.component.html',
  styleUrls: ['./fg-stock-assumption.component.scss']
})
export class FgStockAssumptionComponent implements OnInit {
  startDate: any = '';
  submitt:boolean = false;
  endDate:any = '';
  fg_sap: any = '';
  uploadedFile: any;
  onFileUpld:any;


  constructor(private spinner: NgxSpinnerService, private toaster: ToastrService,
    private _router: Router, private _product: ProductsService) { }

  ngOnInit(): void {
  }

  fileUplaod(event:any) {
    this.uploadedFile = event.target.files[0];
  }

  submitForm() {
    this.submitt = true;
    this.spinner.show();
    if (this.startDate == '' || this.uploadedFile == null) {
      this.toaster.error('','Feild is required!');
      this.spinner.hide();
      return;
    }
    const fileData = new FormData();

    fileData.append('start', this.startDate);
    fileData.append('end', this.endDate);
    // fileData.append('fg_sap', this.fg_sap);
    fileData.append('excel', this.uploadedFile);

    this._product.storeDailyProd(fileData).subscribe((res:any) => {
      this.spinner.hide();
      if (res.success == true) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: res.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
      if (res.status == 'Token has Expired') {
        this.toaster.info('Session Time Out','Please login again');
        this._router.navigate(['']);
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
    })
    
  }
}
