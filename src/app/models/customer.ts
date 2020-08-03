import { Coupon } from './coupon';

export class Customer {

    constructor(private id: number, private firstName: string, private lastName: string, private email: string, private password: string, private coupons: Coupon[]) { }

    get _id(): number {
        return this.id;
    }

    set _id(id: number) {
        this.id = id;
    }

    get _firstName() {
        return this.firstName;
    }

    set _firstName(firstName: string) {
        this.firstName = firstName;
    }

    get _lastName() {
        return this.lastName;
    }

    set _lastName(lastName: string) {
        this.lastName = lastName;
    }


    get _email() {
        return this.email;
    }

    set _email(email: string) {
        this.email = email;
    }

    get _password() {
        return this.password;
    }

    set _password(password: string) {
        this.password = password;
    }

    get _coupons(): Coupon[] {
        return this.coupons;
    }

    set _coupons(coupons: Coupon[]) {
        this.coupons = coupons;
    }

    public static customer(data: Customer): Customer {
        let customer: Customer = new Customer(0, "", "", "", "", []);
        Object.assign(customer, data);
        return customer;
    }



}
