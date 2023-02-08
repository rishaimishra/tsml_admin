import { Component, OnInit, Input } from '@angular/core';
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
  prodDropStatus:boolean = false;
  custDropStatus:boolean = false;
  settingsDropStatus:boolean = false;
  @Input() sideNavStatus:boolean = true;

  constructor(private _router: Router,
    private _toaster: ToastrService,
    private _auth: AuthService,
    private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.isTokenUrl = localStorage.getItem('tokenUrl');
    this.isUserLogIn = this._auth.isLoggedIn();
  }

  prodManStatus(){
    this.prodDropStatus = !this.prodDropStatus;
  }
  customerStatus(){
    this.custDropStatus = !this.custDropStatus;
  }
  settingsStatus(){
    this.settingsDropStatus = !this.settingsDropStatus;
  }

  // onClick(){
  //   const sideBar = document.querySelector('.onclick');
  //   sideBar?.addEventListener('click', () => {
  //   sideBar.classList.toggle('has-open'); 
  // })
  //   const itemShow = document.querySelector('.toshow');
  //   itemShow?.addEventListener('click', () => {
  //   itemShow.classList.toggle('show'); 
  // })
  //   const open = document.querySelector('.toopen');
  //   open?.addEventListener('click', () => {
  //   open.classList.toggle('open'); 
  // })
  //   const collap = document.querySelector('.toshow');
  //   collap?.addEventListener('click', () => {
  //   collap.classList.toggle('collapsed'); 
  // })
  // }


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
      }
    })
  };

  logOut() {
    this.isUserLogIn = false;
    this.isUserLogIn = false;
    localStorage.removeItem('tokenUrl');
    this._router.navigate(['/']);
  }
}
