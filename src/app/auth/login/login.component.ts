import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  adminLoginForm: FormGroup;
  submitted: boolean = false;

  constructor(private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _toaster: ToastrService,
    private _spinner: NgxSpinnerService) 
  { 
    this.adminLoginForm = this._fb.group({
      email: ['',  [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['',Validators.required]
    })
  }
  get f() { return this.adminLoginForm.controls; }

  ngOnInit(): void {
  }

  submitLogin() {
    this._spinner.show();
    this.submitted = true;
    if (this.adminLoginForm.invalid) {
      this._spinner.hide();
      return;
    }
    this._auth.adminLogin(this.adminLoginForm.value).subscribe((res: any) => {
      this._spinner.hide();
      if (res.success != false && res.status != 0) {
        localStorage.setItem('tokenUrl', res.token.original.access_token);
        this._toaster.success('Login Successfully')
        this._router.navigate(['/dashboard/dashboard']);
      } 
      else if (res.status == 0 && res.success == false) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.message,
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    }, err => {
      console.log(err);
      this._spinner.hide();
    })
  }
}
