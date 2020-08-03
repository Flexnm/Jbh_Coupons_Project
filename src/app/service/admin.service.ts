import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
import { Customer } from '../models/customer';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  
  constructor(private client: HttpClient) { }

  // private companyURL: string = `http://localhost:8080/admin/${sessionStorage.token}/comapny`;
  // private customerURL: string = `http://localhost:8080/admin/${sessionStorage.token}/customer`;
  // private couponURL: string = `http://localhost:8080/admin/${sessionStorage.token}/coupons`;

  public ping(){
    return this.client.post(`http://localhost:8080/admin/${sessionStorage.token}`, null);
  }

  public addCompany(company: Company) {
    return this.client.post<Company>(`http://localhost:8080/admin/${sessionStorage.token}/company`, company);

  }

  public addCustomer(customer: Customer) {
    return this.client.post<Customer>(`http://localhost:8080/admin/${sessionStorage.token}/customer`, customer);
  }

  public updateCompany(company: Company) {
    return this.client.put<Company>(`http://localhost:8080/admin/${sessionStorage.token}/company`, company);
  }

  public updateCustomer(customer: Customer) {
    return this.client.put<Customer>(`http://localhost:8080/admin/${sessionStorage.token}/customer`, customer);
  }

  public deleteCompany(companyId: number) {
    return this.client.delete(`http://localhost:8080/admin/${sessionStorage.token}/company/${companyId}`, { responseType: 'text' });
  }

  public deleteCustomer(customerId: number) {
    return this.client.delete(`http://localhost:8080/admin/${sessionStorage.token}/customer/${customerId}`, { responseType: 'text' });
  }

  public getOneCompany(companyId: number) {
    return this.client.get<Company>(`http://localhost:8080/admin/${sessionStorage.token}/company/${companyId}`);
  }

  public getOneCustomer(customerId: number) {
    return this.client.get<Customer>(`http://localhost:8080/admin/${sessionStorage.token}/customer/${customerId}`);
  }

  public getAllCompanies() {
    return this.client.get<Company[]>(`http://localhost:8080/admin/${sessionStorage.token}/company`);
  }

  public getAllCustomers() {
    return this.client.get<Customer[]>(`http://localhost:8080/admin/${sessionStorage.token}/customer`);
  }

  public getAllCoupons() {
    return this.client.get<Coupon[]>(`http://localhost:8080/admin/${sessionStorage.token}/coupons`);
  }

}
