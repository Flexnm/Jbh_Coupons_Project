import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { Coupon } from 'src/app/models/coupon';
import { Category } from 'src/app/models/category.enum';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-purchase-coupons',
  templateUrl: './purchase-coupons.component.html',
  styleUrls: ['./purchase-coupons.component.css']
})
export class PurchaseCouponsComponent implements OnInit, OnDestroy {

  couponsGrid: Coupon[];
  coupCat: Array<string | Category>;
  subscription: Subscription;
  constructor(private errorBar: MatSnackBar, private customer: CustomerService) {
    this.subscription = customer.couponsPurchase$.subscribe(
      coupon => {
        this.couponsGrid.splice(this.couponsGrid.indexOf(coupon), 1); this.displayPurchasableCoupons();
      }
    );
  }

  ngOnInit(): void {
    this.coupCat = Object.values(Category).slice(0, Object.values(Category).length / 2);
    this.displayPurchasableCoupons();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filterStuff(getType, data) {
    this.displayPurchasableCoupons(getType, data);
  }

  public displayPurchasableCoupons(getType?: string, filter?: any) {
    this.customer.getAllPurchasableCoupons(getType, filter).subscribe(
      (coupons) => { this.couponsGrid = coupons; },
      (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); });
  }

}
