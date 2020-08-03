import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../models/coupon';
import { Category } from '../models/category.enum';
import { Customer } from '../models/customer';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private client: HttpClient) { }

  // `http://localhost:8080/customer/${sessionStorage.token}/`

  private couponsPurchaseSource = new Subject<Coupon>();

  couponsPurchase$ = this.couponsPurchaseSource.asObservable();

  couponsSubjectMethod(coupon: Coupon) {
    this.couponsPurchaseSource.next(coupon);
  }

  public getCustomerDetails() {
    return this.client.get<Customer>(`http://localhost:8080/customer/${sessionStorage.token}/`);
  }

  public purchaseCoupon(couponId: number) {
    return this.client.post<number>(`http://localhost:8080/customer/${sessionStorage.token}/purchase`, couponId);
  }

  public getAllPurchasableCoupons(getType?: string, filter?: any) { // to depricate the grid list needs to be defined as a custom datasource object.
    if (getType == "category" && Object.values(Category).includes(filter)) {
      return this.client.get<Coupon[]>(`http://localhost:8080/customer/${sessionStorage.token}/purchase/c-${filter}`);
    } else if (filter != 0 && filter != "" && getType == "price") {
      return this.client.get<Coupon[]>(`http://localhost:8080/customer/${sessionStorage.token}/purchase/p-${filter}`);
    }
    return this.client.get<Coupon[]>(`http://localhost:8080/customer/${sessionStorage.token}/purchase/`);
  }

  public getCustomerCoupons(getType?: string, filter?: any) { // depricated
    if (getType == "category" && Object.values(Category).includes(filter)) {
      return this.client.get<Coupon[]>(`http://localhost:8080/customer/${sessionStorage.token}/category/${Category[filter]}`);
    } else if (filter != 0 && filter != "" && getType == "price") {
      return this.client.get<Coupon[]>(`http://localhost:8080/customer/${sessionStorage.token}/price/${filter}`);
    }
    return this.client.get<Coupon[]>(`http://localhost:8080/customer/${sessionStorage.token}/coupons`);
  }
}
