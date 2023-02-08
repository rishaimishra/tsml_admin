import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from 'src/app/service/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.scss']
})
export class SecurityQuestionsComponent implements OnInit {
  securityQuestion:string = "";
  allSecurityQuestions:any = [];
  constructor(private _location: Location, private toaster: ToastrService,
    private _spinner: NgxSpinnerService, private _settings:SettingsService, private _router: Router) { }

  ngOnInit(): void {
    this. getAllExistingQuestions();
  }

  // goBack(){
  //   this._location.back();
  // }

  saveQuestion(){
    this._spinner.show();
    let securityQ = {
      "s_question": this.securityQuestion,   
    };

    if (securityQ) {
      this._settings.postSecurityQuestion(securityQ).subscribe((res:any) => {
        this._spinner.hide();
        console.log(res);
        if (res.status == 1) {
          this.toaster.success(res.message);
        }
        this.securityQuestion = "";
      }, err => {
        console.log(err);
      })
    }
  }

  
  getAllExistingQuestions(){
    this._spinner.show();
    this._settings.getSecurityQuestion().subscribe((res: any) => {
      if (res.status == 1) {
        this.allSecurityQuestions = res.result;
        console.log(this.allSecurityQuestions);
        this._spinner.hide();
      }
      if (res.status == 'Authorization Token not found') {
        this._router.navigate(['']);
        this._spinner.hide();
      }
    }, err => {
      console.log(err);
      this._spinner.hide();
    })
  }

}
