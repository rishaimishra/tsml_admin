import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'manage-charges',
    loadChildren: () => import('./manage-charges/manage-charges.module').then(m => m.ManageChargesModule)
  },
  {
    path: 'price-management',
    loadChildren: () => import('./price-management/price-management.module').then(m => m.PriceManagementModule)
  },
  {
    path: 'product-management',
    loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'po',
    loadChildren: () => import('./po/po.module').then(m => m.PoModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
