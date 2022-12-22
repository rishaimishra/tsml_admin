import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-upload',
  templateUrl: './customer-upload.component.html',
  styleUrls: ['./customer-upload.component.scss']
})
export class CustomerUploadComponent implements OnInit {
  uploadedFile: any;
  onFileUpld:any;

  constructor(private product: ProductsService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  fileUplaod(event:any) {
    this.uploadedFile = event.target.files[0];
  };

  submitForm() {
    this.spinner.show();
    const fileData = new FormData();
    fileData.append('excel', this.uploadedFile);
    this.product.customerUpload(fileData).subscribe((res:any) => {
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
    }, err => {
      console.log(err);
      this.spinner.hide();
    })
  }
}
