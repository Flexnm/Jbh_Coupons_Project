import { Component, OnInit } from '@angular/core';
import { CustomerComponent } from '../customer.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Coupon } from 'src/app/models/coupon';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-coupons-cart',
  templateUrl: './coupons-cart.component.html',
  styleUrls: ['./coupons-cart.component.css']
})
export class CouponsCartComponent implements OnInit {

  couponsSource: MatTableDataSource<Coupon>
  loopingColumns: string[] = ["title", "description", "category"]
  cartTableColumns: string[] = ["select", "title", "description", "category"]
  selectionModel: SelectionModel<Coupon> = new SelectionModel<Coupon>(true, []);
  topSelect: boolean;
  constructor(private dialogRef: MatDialogRef<CustomerComponent>) { }

  ngOnInit(): void {
    this.couponsSource = new MatTableDataSource(JSON.parse(sessionStorage.getItem("purchaseCart")));
  }

  isAllSelected(): boolean {
    return this.selectionModel.selected.length == this.couponsSource.data.length;
  }

  allToggle() {
    if (this.isAllSelected()) {
      this.selectionModel.clear();
    } else {
      this.couponsSource.data.forEach(row => this.selectionModel.select(row));
    }
  }

  purchaseCoupons() {
    let newCart:Coupon[] = [];
    this.couponsSource.data.forEach(coupon => {
      if(!this.selectionModel.isSelected(coupon)){
        newCart.push(coupon);
      }
    });
    sessionStorage.setItem("purchaseCart", JSON.stringify(newCart));
    this.dialogRef.close(this.selectionModel.selected);
  }



}
