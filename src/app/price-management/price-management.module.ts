import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceManagementComponent } from './price-management/price-management.component';
import { AddPriceManagementComponent } from './add-price-management/add-price-management.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'price-management', component: PriceManagementComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-price-management', component: AddPriceManagementComponent, canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    PriceManagementComponent,
    AddPriceManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PriceManagementModule { }
