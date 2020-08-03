import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  editCompForm: FormGroup;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private companyData: Company, private dialogRef: MatDialogRef<UpdateCompanyComponent>) { }

  ngOnInit(): void {
    this.editCompForm = this.fb.group({
      cEmail: [this.companyData._email, [Validators.required, Validators.email]],
      cPassword: [this.companyData._password, Validators.required]
    });
  }

  get fctrl() {
    return this.editCompForm.controls;
  }

  public updateCompany(data) {
    const company = new Company(this.companyData._id, this.companyData._name, data.cEmail, data.cPassword, this.companyData._coupons);
    this.dialogRef.close(company);
  }

}
