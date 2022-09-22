import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

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
      email: ['', Validators.required],
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
      if (res.success != false) {
        localStorage.setItem('tokenUrl', res.token.original.access_token);
        this._toaster.success('Login Successfully')
        this._router.navigate(['/dashboard']);
        this._spinner.hide();
      } 
    }, err => {
      this._toaster.error('Something went Wrong');
      console.log(err);
      this._spinner.hide();
    })
  }
}
