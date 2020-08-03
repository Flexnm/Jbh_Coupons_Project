import { Component, OnInit, Inject } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Coupon } from 'src/app/models/coupon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  coupCat: Array<string | Category>;
  addCouponForm: FormGroup;
  couponImage: File;
  couponImageURL: string;
  placeholderImage: string = "assets/images/placeholder.png"
  imagePreview: string;
  constructor(private errorBar: MatSnackBar, private company: CompanyService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private myCompany: number, private matDialogRef: MatDialogRef<AddCouponComponent>) { }

  ngOnInit(): void {
    this.imagePreview = this.placeholderImage
    this.coupCat = Object.values(Category).slice(0, Object.values(Category).length / 2);
    this.addCouponForm = this.fb.group({
      cCategory: ["", Validators.required],
      cTitle: ["", [Validators.required]],
      cDescription: ["", Validators.required],
      cStartDate: ["", [Validators.required, this.validDate]],
      cEndDate: ["", [Validators.required, this.validDate]],
      cAmount: ["", [Validators.required, Validators.min(1)]],
      cPrice: ["", [Validators.required, Validators.min(0)]],
      cImage: ["", [Validators.required, this.validImage]]

    });
  }

  get fctrl() {
    return this.addCouponForm.controls;
  }

  validImage(controls: AbstractControl) {
    if (controls.value == "") { // ?
      return { InvalidImage: true };
    } else if (controls.value.length >= 50000) {
      return { ImageSizeError: true };
    }
  }

  validDate(controls: AbstractControl) {
    let testedDate: Date = new Date(controls.value);
    if (testedDate.valueOf() < (new Date()).valueOf()) {
      return { DateError: true };
    }
  }

  imageProcess(files: FileList) {
    // let imgElement = new Image();
    this.couponImage = files[0];
    let type = this.couponImage.type;
    if (type.match(/image\/*/) != null) {
      let fileReader = new FileReader();
      fileReader.onload = () => { this.fctrl['cImage'].setValue(fileReader.result as string); this.couponImageURL = window.btoa(fileReader.result as string); }
      fileReader.readAsDataURL(this.couponImage);
    }
  }

  addCoupon() {
    if (typeof this.couponImageURL != "undefined" && this.addCouponForm.valid) {
      const newCoupon = new Coupon(
        0,
        this.myCompany,
        this.fctrl['cCategory'].value,
        this.fctrl['cTitle'].value,
        this.fctrl['cDescription'].value,
        this.fctrl['cStartDate'].value,
        this.fctrl['cEndDate'].value,
        this.fctrl['cAmount'].value,
        this.fctrl['cPrice'].value,
        this.couponImageURL
      );
      this.company.addCoupon(newCoupon).subscribe((coupon) => { this.matDialogRef.close(coupon); }, (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); });
    } // if this fails it popps the errors 


  }

}
