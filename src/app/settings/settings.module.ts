import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetThresholdLimitsComponent } from './set-threshold-limits/set-threshold-limits.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'set-threshold-limit', component: SetThresholdLimitsComponent, canActivate: [AuthGuard]
  },
]

@NgModule({
  declarations: [
    SetThresholdLimitsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SettingsModule { }
