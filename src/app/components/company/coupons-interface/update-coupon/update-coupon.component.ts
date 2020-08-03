import { Component, OnInit, Inject } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { Coupon } from 'src/app/models/coupon';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent implements OnInit {

  coupCat: Array<string | Category>;
  editCoupon: FormGroup;
  couponImage: File;
  couponImageURL: string;
  imagePreview: string;
  constructor(private errorBar:MatSnackBar, private company: CompanyService, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private couponData: Coupon, private dialogRef: MatDialogRef<UpdateCouponComponent>) { }

  ngOnInit(): void {
    
    this.imagePreview = this.couponData._image;
    this.coupCat = Object.values(Category).slice(0, Object.values(Category).length / 2);
    this.editCoupon = this.fb.group({
      cCategory: [this.couponData._category, Validators.required],
      cTitle: [this.couponData._title, Validators.required],
      cDescription: [this.couponData._description, Validators.required],
      cStartDate: [this.couponData._startDate, Validators.required],
      cEndDate: [this.couponData._endDate, [Validators.required, this.couponDateValidation]],
      cAmount: [this.couponData._amount, [Validators.required, Validators.min(1)]],
      cPrice: [this.couponData._price, [Validators.required, Validators.min(0)]],
      cImage: [this.imagePreview, [Validators.required, this.validImage]]
    });
  }

  get fctrl() {
    return this.editCoupon.controls;
  }

  validImage(controls: AbstractControl) {
   if (controls.value.length >= 50000) {
      return { ImageSizeError: true };
    }
  }


  couponDateValidation(controls: AbstractControl) {
    let date: Date = new Date();
    date.setHours(0, 0, 0, 0);
    if (new Date(controls.value).valueOf() < date.valueOf()) {
      return { dataEditError: true };
    }
  }

  imageProcess(files: FileList) {
    this.couponImage = files[0];
    let type = this.couponImage.type;
    let size = this.couponImage.size;
    if (type.match(/image\/*/) != null && size <= 50000) {
      let fileReader = new FileReader();
      fileReader.onload = () => { this.fctrl['cImage'].setValue(fileReader.result as string); this.couponImageURL = window.btoa(fileReader.result as string); }
      fileReader.readAsDataURL(this.couponImage);
    } // else do poppup?
  }

  //  add complex validators.
  updateCoupon() {
    this.couponImageURL = window.btoa(this.couponData._image);
    const updatedCoupon = new Coupon(this.couponData._id, this.couponData._companyId, this.fctrl['cCategory'].value, this.fctrl['cTitle'].value, this.fctrl['cDescription'].value,
      this.fctrl['cStartDate'].value, this.fctrl['cEndDate'].value, this.fctrl['cAmount'].value, this.fctrl['cPrice'].value, this.couponImageURL);
    this.company.updateCoupon(updatedCoupon).subscribe((coupon) => { this.dialogRef.close(updatedCoupon); }, (err) => { this.errorBar.open(err.error, "close", {duration:2000}); });
    
  }
}
