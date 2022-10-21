import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to log out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        this.logOut();
        Swal.fire(
          'Logout',
          'Success',
        )
      }
    })
  }

  logOut() {
    this.isUserLogIn = false;
    this.isUserLogIn = false;
    localStorage.removeItem('tokenUrl');
    this._router.navigate(['/']);
  }
}
