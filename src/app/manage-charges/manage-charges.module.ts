import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreightChargesComponent } from './freight-charges/freight-charges.component';
import { AddFreightChargesComponent } from './add-freight-charges/add-freight-charges.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  {
    path: 'freight-charges', component: FreightChargesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-freight-charges', component: AddFreightChargesComponent, canActivate: [AuthGuard]
  },
]
@NgModule({
  declarations: [
    FreightChargesComponent,
    AddFreightChargesComponent
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
export class ManageChargesModule { }
