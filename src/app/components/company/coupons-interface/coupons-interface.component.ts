import { Component, OnInit, ViewChild } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CompanyService } from 'src/app/service/company.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCouponComponent } from './update-coupon/update-coupon.component';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Category } from 'src/app/models/category.enum';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { Company } from 'src/app/models/company';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-coupons-interface',
  templateUrl: './coupons-interface.component.html',
  styleUrls: ['./coupons-interface.component.css']
})
export class CouponsInterfaceComponent implements OnInit {

  @ViewChild(MatTable)
  coupTable: MatTable<Coupon>
  coupCat: Array<string | Category>;
  couponsSource: MatTableDataSource<Coupon>;
  couponsTableHeaders: string[] = ["description", "startDate", "endDate", "amount", "price"];
  allCouponsTableHeaders: string[] = ["id", "title", "category", "description", "startDate", "endDate", "amount", "price", "image", "edit", "delete"];
  myCompany: number;
  constructor(private errorBar:MatSnackBar, private company: CompanyService, private editCoupon: MatDialog, private addCouponWindow: MatDialog) { }

  ngOnInit(): void {
    this.coupCat = Object.values(Category).slice(0, Object.values(Category).length / 2);
    this.company.getCompanyDetails().subscribe((compData) => { this.myCompany = Company.company(compData)._id }, (err) => { this.errorBar.open(err.error, "close", {duration:2000}); })
    this.displayCoupons();
  }

  categoryFilter(cat: string) {
    const filterValue = cat;
    this.couponsSource.filterPredicate = c => Coupon.coupon(c)._category.toString() == filterValue;
    this.couponsSource.filter = filterValue.trim();
  }

  priceFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.couponsSource.filterPredicate = c => Coupon.coupon(c)._price <= Number(filterValue);
    this.couponsSource.filter = filterValue.trim().toLowerCase();
  }

  addCoupon() {
    const addCouponWindowRef = this.addCouponWindow.open(AddCouponComponent, { data: this.myCompany });
    addCouponWindowRef.afterClosed().subscribe((newCoup: Coupon) => {
      if (newCoup) {
        this.couponsSource.data.push(newCoup);
        this.coupTable.renderRows();
      }
    })
  }

  public updateCoupon(data: Coupon) {
    const editCouponRef = this.editCoupon.open(UpdateCouponComponent, { data: Coupon.coupon(data), disableClose: false });
    editCouponRef.afterClosed().subscribe((updatedCoup: Coupon) => {
      if (updatedCoup) {
        let i = this.couponsSource.data.indexOf(data);
        this.couponsSource.data[i] = updatedCoup; this.coupTable.renderRows()
      }
    });
  }

  public deleteCoupon(couponDel: Coupon) {
    this.company.deleteCoupon(Coupon.coupon(couponDel)._id).subscribe(() => { this.couponsSource.data.splice(this.couponsSource.data.indexOf(couponDel), 1); this.coupTable.renderRows() }, (err) => { this.errorBar.open(err.error, "close", {duration:2000}); });
  }

  imageSrcProvider(data: string) {
    return window.atob(data);
  }

  public displayCoupons(getType?: string, filter?: any) {
    this.company.getCompanyCoupons(getType, filter).subscribe((coupons) => { this.couponsSource = new MatTableDataSource(coupons); }, (err) => { this.errorBar.open(err.error, "close", {duration:2000}); });
  }

}
