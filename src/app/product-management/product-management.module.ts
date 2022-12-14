import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { AuthGuard } from '../auth/auth.guard';
import { FgStockAssumptionComponent } from './fg-stock-assumption/fg-stock-assumption.component';
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  {
    path:'category', component: CategoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'sub-category', component: SubCategoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-category', component: AddCategoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-sub-category', component: AddSubCategoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'fg-stock', component: FgStockAssumptionComponent, canActivate: [AuthGuard]
  }
]


@NgModule({
  declarations: [
    CategoryComponent,
    SubCategoryComponent,
    AddCategoryComponent,
    AddSubCategoryComponent,
    FgStockAssumptionComponent
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
export class ProductManagementModule { }
