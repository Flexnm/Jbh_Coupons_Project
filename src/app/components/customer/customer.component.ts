import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/models/customer';
import { Coupon } from 'src/app/models/coupon';
import { MatDialog } from '@angular/material/dialog';
import { CouponsCartComponent } from './coupons-cart/coupons-cart.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {

  customerData: Customer;
  constructor(private errorBar: MatSnackBar, private customer: CustomerService, private couponsCartWindow: MatDialog) { }

  ngOnInit(): void {
    this.displayCustomer();
  }

  public displayCustomer() {
    this.customer.getCustomerDetails().subscribe((customerDetails) => {
      this.customerData = Customer.customer(customerDetails);
      if (sessionStorage.getItem(("purchaseCart")) == null) {
        sessionStorage.setItem("purchaseCart", JSON.stringify(new Array<Coupon>()));
      }
    }, (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); });
  }

  public showCart() {
    const cartDialogRef = this.couponsCartWindow.open(CouponsCartComponent, { disableClose: false, width: '75%' });
    cartDialogRef.afterClosed().subscribe((purchases: Coupon[]) => { purchases ? this.purchaseFunction(purchases) : null; });
  }

  public confirmPurchase() {
    this.purchaseFunction(JSON.parse(sessionStorage.getItem("purchaseCart")));
    sessionStorage.setItem("purchaseCart", "[]");
  }

  purchaseFunction(itemsToBuy: Coupon[]) {
    Coupon.coupons(itemsToBuy).forEach(storedCouponToBuy => {
      this.customer.purchaseCoupon(storedCouponToBuy._id).subscribe((bought) => {
        this.customer.couponsSubjectMethod(storedCouponToBuy);
      },
        (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); });
    });
  }

}