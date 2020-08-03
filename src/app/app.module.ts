import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CompaniesInterfaceComponent } from './components/admin/companies/companies-interface/companies-interface.component';
import { UpdateCompanyComponent } from './components/admin/companies/update-company/update-company.component';
import { AddCompaniesComponent } from './components/admin/companies/add-companies/add-companies.component';
import { CustomersInterfaceComponent } from './components/admin/customers/customers-interface/customers-interface.component';
import { AddCustomersComponent } from './components/admin/customers/add-customers/add-customers.component';
import { UpdateCustomersComponent } from './components/admin/customers/update-customers/update-customers.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AddCouponComponent } from './components/company/coupons-interface/add-coupon/add-coupon.component';
import { CouponsInterfaceComponent } from './components/company/coupons-interface/coupons-interface.component';
import { UpdateCouponComponent } from './components/company/coupons-interface/update-coupon/update-coupon.component';
import { CompanyComponent } from './components/company/company.component';
import { CustomerDataComponent } from './components/customer/customer-data/customer-data.component';
import { PurchaseCouponsComponent } from './components/customer/purchase-coupons/purchase-coupons.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';
import { CouponsCartComponent } from './components/customer/coupons-cart/coupons-cart.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { AspectErrorsHandlerService } from "./service/aspect-errors-handler.service";
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    CompaniesInterfaceComponent,
    UpdateCompanyComponent,
    AddCompaniesComponent,
    CustomersInterfaceComponent,
    AddCustomersComponent,
    UpdateCustomersComponent,
    AdminComponent,
    AddCouponComponent,
    CouponsInterfaceComponent,
    UpdateCouponComponent,
    CompanyComponent,
    CustomerDataComponent,
    PurchaseCouponsComponent,
    CustomerComponent,
    HomeComponent,
    CouponsCartComponent,
    CouponComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AspectErrorsHandlerService, multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
