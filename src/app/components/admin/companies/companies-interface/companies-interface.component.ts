import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Company } from 'src/app/models/company';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCompanyComponent } from '../update-company/update-company.component';
import { AddCompaniesComponent } from '../add-companies/add-companies.component';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-companies-interface',
  templateUrl: './companies-interface.component.html',
  styleUrls: ['./companies-interface.component.css']
})
export class CompaniesInterfaceComponent implements OnInit {

  @ViewChild(MatTable, { static: false })
  companiesTable: MatTable<any>;
  companiesList: MatTableDataSource<Company>;
  clickedComp: Company;
  companiesTableHeaders: string[] = ["id", "name", "email", "password", "edit", "delete"];
  allCouponsTableHeaders: string[] = ["id", "title", "category", "description", "startDate", "endDate", "amount", "price", "image"];
  couponsTableHeaders: string[] = ["id", "title", "category", "description", "startDate", "endDate", "amount", "price"];
  clickableColumns: string[] = ["id", "name", "email", "password"];
  constructor(private errorBar: MatSnackBar, private admin: AdminService, private companyUpdate: MatDialog, private companyAdd: MatDialog) { }

  ngOnInit(): void {
    this.getAllCompanies();
  }

  custFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companiesList.filter = filterValue.trim().toLowerCase();
  }

  /**
   forced to repeatedly use this method to update the table datasource because the drawer that is used to display individual company coupons breaks the functionality of mat-table for no reason whatsoever and it does not throw any errors in console or help of any kind to even begin to fix it.
   */

  public getAllCompanies() {
    this.admin.getAllCompanies().subscribe((companies) => { this.companiesList = new MatTableDataSource(companies); }, (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); });
  }

  couponSideDisplay(compId: number) {
    this.admin.getOneCompany(compId).subscribe((comp) => { this.clickedComp = Company.company(comp); }, (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); });
  }

  updateCompany(data: Company) {
    const updateCompanyRef = this.companyUpdate.open(UpdateCompanyComponent, { data: Company.company(data), disableClose: false });
    updateCompanyRef.afterClosed().subscribe((updatedComp: Company) => {
      if (updatedComp) {
        this.admin.updateCompany(updatedComp).subscribe((company) => {
          // this.companiesList.data[this.companiesList.data.indexOf(data)] = company;
          // this.companiesTable.renderRows();
          this.getAllCompanies();
        },
          (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); });
      }
    });
  }

  addCompany() {
    const addCompanyRef = this.companyAdd.open(AddCompaniesComponent);
    addCompanyRef.afterClosed().subscribe((newComp: Company) => {
      if (newComp) {
        // this.companiesList.data.push(newComp);
        // this.companiesTable.renderRows();
        this.getAllCompanies();
      }
    });
  }

  couponImage(data: string) {
    return window.atob(data);
  }

  deleteCompany(data: Company) {
    this.admin.deleteCompany(Company.company(data)._id).subscribe((deleted) => { /*this.companiesList.data.splice(this.companiesList.data.indexOf(data), 1); // this.companiesTable.renderRows();*/ this.getAllCompanies(); }, (err) => { this.errorBar.open(err.error, "close", { duration: 2000 }); });
  }

}
