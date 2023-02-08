import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from 'src/app/service/settings.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-security-question',
  templateUrl: './edit-security-question.component.html',
  styleUrls: ['./edit-security-question.component.scss']
})
export class EditSecurityQuestionComponent implements OnInit {
  // editSecurityQuestion:string = "";
  qid:number =  0;
  sq:string= '';
  constructor( private _location:Location, private toaster: ToastrService,
    private _spinner: NgxSpinnerService, private _settings:SettingsService, private _route: ActivatedRoute ) { }

  ngOnInit(): void {
    this._settings.getCurrentQuestion(this._route.snapshot.params['id']).subscribe((s_ques:any) => {
      this.qid = s_ques.result.security_question_id;
      this.sq = s_ques.result.s_question;
    })
  }

  goBack() {
    this._location.back();
  };
  updateQuestion(){
      this._spinner.show();
      let updatedQustion = {
        "s_question": this.sq,
        "secqueid": this.qid,   
      };
      if (updatedQustion) {
        this._settings.postUpdatedQuestion(updatedQustion).subscribe((res:any) => {
          this._spinner.hide();
          console.log(res);
          this._location.back();
          if (res.status == 1) {
            this.toaster.success(res.message);
          }
        }, err => {
          console.log(err);
        })
    }
  }

}
