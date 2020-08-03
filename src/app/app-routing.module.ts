import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { CompaniesInterfaceComponent } from './components/admin/companies/companies-interface/companies-interface.component';
import { CustomersInterfaceComponent } from './components/admin/customers/customers-interface/customers-interface.component';
import { CompanyComponent } from './components/company/company.component';
import { CouponsInterfaceComponent } from './components/company/coupons-interface/coupons-interface.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerDataComponent } from './components/customer/customer-data/customer-data.component';
import { PurchaseCouponsComponent } from './components/customer/purchase-coupons/purchase-coupons.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "logout", redirectTo: "login" },
  { path: "", pathMatch: "full", redirectTo: "login" },
  {
    path: "admin", component: AdminComponent, children: [
      { path: "comp", component: CompaniesInterfaceComponent },
      { path: "cust", component: CustomersInterfaceComponent },
    ]
  },
  {
    path: "company", component: CompanyComponent, children:
      [
        { path: "", pathMatch: "full", component: CouponsInterfaceComponent },
      ]
  },
  {
    path: "customer", component: CustomerComponent, children: [
      { path: "", pathMatch: "full", component: CustomerDataComponent },
      { path: "purchase", component: PurchaseCouponsComponent }
    ]
  },
  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "not-found", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
