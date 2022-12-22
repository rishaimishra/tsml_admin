import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPoComponent } from './view-po/view-po.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoDetailsComponent } from './po-details/po-details.component';
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  {path: 'po-list', component: ViewPoComponent,canActivate: [AuthGuard]},
  {path: 'po-details/:id', component: PoDetailsComponent,canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    ViewPoComponent,
    PoDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class PoModule { }
