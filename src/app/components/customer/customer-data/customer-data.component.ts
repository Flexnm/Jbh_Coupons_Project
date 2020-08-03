import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { Coupon } from 'src/app/models/coupon';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Category } from 'src/app/models/category.enum';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.css']
})
export class CustomerDataComponent implements OnInit, OnDestroy {

  @ViewChild(MatTable)
  theTable: MatTable<Coupon>;
  coupCat: Array<string | Category>;
  boughtCoupons: MatTableDataSource<Coupon>;
  couponsTableHeaders: string[] = ["description", "startDate", "endDate", "price"];
  allCouponsTableHeaders: string[] = ["title", "category", "description", "startDate", "endDate", "price", "image"];
  subscription: Subscription;

  constructor(private errorBar: MatSnackBar, private customer: CustomerService) {

    this.subscription = customer.couponsPurchase$.subscribe(
      coupon => {
        this.boughtCoupons.data.push(coupon)
        this.theTable.renderRows();
      }
    );
  }

  ngOnInit(): void {
    this.coupCat = Object.values(Category).slice(0, Object.values(Category).length / 2);
    this.purchases();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filterStuff(type: string, data: any) {
    const filterValue = data;
    switch (type) {
      case "price":
        this.boughtCoupons.filterPredicate = c => Coupon.coupon(c)._price <= Number(filterValue);
        break;
      case "category":
        this.boughtCoupons.filterPredicate = c => Coupon.coupon(c)._category.toString() == filterValue;
        break;
    }
    this.boughtCoupons.filter = filterValue.trim();
  }

  couponImage(data: string) {
    return window.atob(data);
  }

  doThing(data){
    console.log(data);
  }

  public purchases(getType?: string, filter?: any) {
    this.customer.getCustomerCoupons(getType, filter).subscribe((coupons) => { this.boughtCoupons = new MatTableDataSource(coupons) }, (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); })
  }
}
