import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetThresholdLimitsComponent } from './set-threshold-limits/set-threshold-limits.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';
import { SetThresholdComponent } from './set-threshold/set-threshold.component';
import { EditThresholdPriceComponent } from './edit-threshold-price/edit-threshold-price.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SecurityQuestionsComponent } from './security-questions/security-questions.component';
import { EditSecurityQuestionComponent } from './edit-security-question/edit-security-question.component';


const routes: Routes = [
  {
    path: 'threshold-limit', component: SetThresholdLimitsComponent, canActivate: [AuthGuard]
    
  },
  {
    path: 'security-questions', component: SecurityQuestionsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit-security-question/:id', component: EditSecurityQuestionComponent, canActivate: [AuthGuard]
  },
  {
    path: 'set-threshold', component: SetThresholdComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit-threshold/:id', component: EditThresholdPriceComponent, canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    SetThresholdLimitsComponent,
    SetThresholdComponent,
    EditThresholdPriceComponent,
    SecurityQuestionsComponent,
    EditSecurityQuestionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class SettingsModule { }
