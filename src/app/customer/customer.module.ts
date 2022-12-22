import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerUploadComponent } from './customer-upload/customer-upload.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {path: 'customer-upload', component: CustomerUploadComponent}
]



@NgModule({
  declarations: [
    CustomerUploadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CustomerModule { }
