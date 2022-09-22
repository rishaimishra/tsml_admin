import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isTokenUrl: any;
  isUserLogIn: boolean = false;


  constructor(private _router: Router,
    private _toaster: ToastrService,
    private _auth: AuthService,
    private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.isTokenUrl = localStorage.getItem('tokenUrl');
    this.isUserLogIn = this._auth.isLoggedIn();
  }

  logMeOut() {
    this.isUserLogIn = false;
    this.isUserLogIn = false;
    localStorage.removeItem('tokenUrl');
    this._router.navigate(['/']);
    this._toaster.success('Logging out');

  }

  // logOut() {
  //   this._spinner.show();
  //   localStorage.removeItem('tokenUrl');
  //   this.isUserLogIn = false;
  //   this.isUserLogIn = false;
  //   this._toaster.success('Logging Out !');
  //   setTimeout(() => {
  //     this._spinner.hide();
  //   }, 1000);
  //   this._router.navigate(['/']);
  // }
}
