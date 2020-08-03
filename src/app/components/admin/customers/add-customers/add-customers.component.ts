import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Customer } from 'src/app/models/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css']
})
export class AddCustomersComponent implements OnInit {

  addCustForm: FormGroup;
  constructor(private errorBar: MatSnackBar, private service: AdminService, private fb: FormBuilder, private dialogRef: MatDialogRef<AddCustomersComponent>) { }

  ngOnInit(): void {
    this.addCustForm = this.fb.group({
      cFirstName: ["", Validators.required],
      cLastName: ["", Validators.required],
      cEmail: ["", [Validators.required, Validators.email]],
      cPassword: ["", Validators.required]
    });
  }

  get fctrl() {
    return this.addCustForm.controls;
  }

  public addCustomer() {
    const customer: Customer = new Customer(0, this.fctrl['cFirstName'].value, this.fctrl['cLastName'].value, this.fctrl['cEmail'].value, this.fctrl['cPassword'].value, []);
    this.service.addCustomer(customer).subscribe((customer) => { this.dialogRef.close(customer); }, (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); });

  }

}
