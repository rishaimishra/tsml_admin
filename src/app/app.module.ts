import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ManageChargesModule } from './manage-charges/manage-charges.module';
import { PriceManagementModule } from './price-management/price-management.module';
import { ProductManagementModule } from './product-management/product-management.module';
import { SettingsModule } from './settings/settings.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthIntercepto } from './service/auth.interceptor';



@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    HttpClientModule,
    AuthModule,
    ProductManagementModule,
    PriceManagementModule,
    ManageChargesModule,
    HttpClientModule,
    SettingsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() ,
    NgxSpinnerModule.forRoot(),

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthIntercepto, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
