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
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

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
  },
  {
    path: 'product-upload', component: ProductUploadComponent, canActivate: [AuthGuard]
  },
  {
    path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit-category/:id', component: EditCategoryComponent, canActivate: [AuthGuard]
  },
]


@NgModule({
  declarations: [
    CategoryComponent,
    SubCategoryComponent,
    AddCategoryComponent,
    AddSubCategoryComponent,
    FgStockAssumptionComponent,
    ProductUploadComponent,
    ProductListComponent,
    EditProductComponent,
    AddProductComponent,
    EditCategoryComponent
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
