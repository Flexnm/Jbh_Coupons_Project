import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Company } from 'src/app/models/company';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-companies',
  templateUrl: './add-companies.component.html',
  styleUrls: ['./add-companies.component.css']
})
export class AddCompaniesComponent implements OnInit {

  addCompForm: FormGroup;
  constructor(private errorBar: MatSnackBar, private service: AdminService, private fb: FormBuilder, private dialogRef: MatDialogRef<AddCompaniesComponent>) { }

  ngOnInit(): void {
    this.addCompForm = this.fb.group({
      cName: ["", Validators.required],
      cEmail: ["", [Validators.required, Validators.email]],
      cPassword: ["", Validators.required]
    });
  }

  get fctrl() {
    return this.addCompForm.controls;
  }

  public addCompany() {
    const company: Company = new Company(0, this.fctrl['cName'].value, this.fctrl['cEmail'].value, this.fctrl['cPassword'].value, []);
    this.service.addCompany(company).subscribe((company) => { this.dialogRef.close(company); }, (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); });
  }

}
