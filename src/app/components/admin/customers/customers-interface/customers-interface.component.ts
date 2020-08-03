import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Customer } from 'src/app/models/customer';
import { AddCustomersComponent } from '../add-customers/add-customers.component';
import { UpdateCustomersComponent } from '../update-customers/update-customers.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers-interface',
  templateUrl: './customers-interface.component.html',
  styleUrls: ['./customers-interface.component.css']
})
export class CustomersInterfaceComponent implements OnInit {

  @ViewChild(MatTable, {static : false})
  customersTable: MatTable<Customer>
  customersList: MatTableDataSource<Customer>;
  clickedCust: Customer;
  customersTableHeaders: string[] = ["id", "firstName", "lastName", "email", "password", "edit", "delete"];
  allCouponsTableHeaders: string[] = ["id", "title", "category", "description", "startDate", "endDate", "amount", "price", "image"];
  couponsTableHeaders: string[] = ["id", "title", "category", "description", "startDate", "endDate", "amount", "price"];
  clickableColumns: string[] = ["id", "firstName", "lastName", "email", "password"];
  constructor(private errorBar:MatSnackBar, private admin: AdminService, private customerUpdate: MatDialog, private customerAdd: MatDialog) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  custFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customersList.filter = filterValue.trim().toLowerCase();
  }

  /**
   forced to repeatedly use this method to update the table datasource because the drawer that is used to display individual customer coupons breaks the functionality of mat-table for no reason whatsoever and it does not throw any errors in console or help of any kind to even begin to fix it.
   */

  public getAllCustomers() {
    this.admin.getAllCustomers().subscribe((customers) => { this.customersList = new MatTableDataSource(customers); }, (err) => { this.errorBar.open(err.error, "close", {duration:2000});});
  }

  couponSideDisplay(custId: number) {
    this.admin.getOneCustomer(custId).subscribe((cust) => { this.clickedCust = Customer.customer(cust) }, (err) => { this.errorBar.open(err.error, "close", {duration:2000}); });
  }

  updateCustomer(data: Customer) {
    const updateCustomerRef = this.customerUpdate.open(UpdateCustomersComponent, { data: Customer.customer(data), disableClose: false });
    updateCustomerRef.afterClosed().subscribe((updatedCust: Customer) => {
      if (updatedCust) {
        this.admin.updateCustomer(updatedCust).subscribe((customer) => {
          // this.customersList.data[this.customersList.data.indexOf(data)] = customer;
          // this.customersTable.renderRows();
          this.getAllCustomers();
        },
          (err) => { this.errorBar.open(err.error, "close", {duration:2000}); });
      }
    });

  }

  addCustomer() {
    const addCustomerRef = this.customerAdd.open(AddCustomersComponent);
    addCustomerRef.afterClosed().subscribe((newCust: Customer) => {
      if (newCust) {
        // this.customersList.data.push(newCust);
        // this.customersTable.renderRows();
        this.getAllCustomers();
      }
    });
  }

  couponImage(data: string) {
    return window.atob(data);
  }


  deleteCustomer(data: Customer) {
    
    this.admin.deleteCustomer(Customer.customer(data)._id).subscribe((deleted) => { /*this.customersList.data.splice(this.customersList.data.indexOf(data), 1); this.customersTable.renderRows()*/ this.getAllCustomers() }, (err) => { this.errorBar.open(err.error, "close", {duration:2000}); });

  }

}
