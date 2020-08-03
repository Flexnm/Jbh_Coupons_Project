import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../models/coupon';
import { Category } from '../models/category.enum';
import { Company } from '../models/company';
import { isNumber } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private client: HttpClient) { }

  // `http://localhost:8080/company/${sessionStorage.token}/`


  public addCoupon(coupon: Coupon) {
    return this.client.post<Coupon>(`http://localhost:8080/company/${sessionStorage.token}/coupon`, coupon);
  }

  public updateCoupon(coupon: Coupon) {
    return this.client.put<Coupon>(`http://localhost:8080/company/${sessionStorage.token}/coupon`, coupon);
  }

  public deleteCoupon(couponId: number) {
    return this.client.delete(`http://localhost:8080/company/${sessionStorage.token}/coupon/${couponId}`, { responseType: 'text' });
  }

  public getCompanyCoupons(getType?: string, filter?: any) {
    if (getType == "category" && Object.values(Category).includes(filter)) {
      return this.client.get<Coupon[]>(`http://localhost:8080/company/${sessionStorage.token}/category/${Category[filter]}`);
    } else if (getType == "price" && isNumber(filter)) {
      return this.client.get<Coupon[]>(`http://localhost:8080/company/${sessionStorage.token}/price/${filter}`);
    }
    return this.client.get<Coupon[]>(`http://localhost:8080/company/${sessionStorage.token}/coupons`);
  }

  public getOneCoupon(couponId: number) {
    return this.client.get<Coupon>(`http://localhost:8080/company/${sessionStorage.token}/coupon/${couponId}`);
  }

  public getCompanyDetails() {
    return this.client.get<Company>(`http://localhost:8080/company/${sessionStorage.token}`);
  }

}
