import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { Company } from 'src/app/models/company';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  myCompany: Company;
  constructor(private errorBar: MatSnackBar, private company: CompanyService) { }

  ngOnInit(): void {
    this.company.getCompanyDetails().subscribe((company) => {
      this.myCompany = Company.company(company);
    }, (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); });
  }
}
