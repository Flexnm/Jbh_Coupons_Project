import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-customers',
  templateUrl: './update-customers.component.html',
  styleUrls: ['./update-customers.component.css']
})
export class UpdateCustomersComponent implements OnInit {

  editCustForm: FormGroup;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private customerData: Customer, private dialogRef: MatDialogRef<UpdateCustomersComponent>) { }

  ngOnInit(): void {
    this.editCustForm = this.fb.group({
      cFirstName: [this.customerData._firstName, Validators.required],
      cLastName: [this.customerData._lastName, Validators.required],
      cEmail: [this.customerData._email, [Validators.required, Validators.email]],
      cPassword: [this.customerData._password, Validators.required]
    });
  }

  get fctrl() {
    return this.editCustForm.controls;
  }

  public updateCustomer(data) {
    const customer = new Customer(this.customerData._id, data.cFirstName, data.cLastName, data.cEmail, data.cPassword, this.customerData._coupons);
    this.dialogRef.close(customer);
  }

}
