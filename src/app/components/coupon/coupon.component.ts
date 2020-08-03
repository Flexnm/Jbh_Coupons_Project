import { Component, OnInit, Input } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  @Input()
  couponItem: Coupon;
  inCart: boolean = false;
  couponImage: string;
  constructor() {
  }
  
  ngOnInit(): void {
    this.couponItem = Coupon.coupon(this.couponItem);
    this.couponImage = this.couponItem._image;
    let coups:Coupon[] = JSON.parse(sessionStorage.getItem("purchaseCart"));
    this.inCart = coups.find(c=>c._id == this.couponItem._id) ? true : false;
  }

  public purchaseCoupon(coupon: Coupon) {
    let cart: Coupon[] = JSON.parse(sessionStorage.getItem("purchaseCart"));
    for (let i = 0; i < cart.length; i++) { 
      if (cart[i]._id == coupon._id) {
        return;
      }
    }
    cart.push(coupon);
    sessionStorage.setItem("purchaseCart", JSON.stringify(cart));
    this.inCart = true;
  }

  public cancelPurchase(coupon: Coupon) {
    let cart: Coupon[] = JSON.parse(sessionStorage.getItem("purchaseCart"));
    cart.splice(cart.indexOf(coupon), 1);
    sessionStorage.setItem("purchaseCart", JSON.stringify(cart));
    this.inCart = false;
  }

}
