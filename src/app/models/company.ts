import { Coupon } from './coupon';

export class Company {

    constructor(private id: number, private name: string, private email: string, private password: string, private coupons: Coupon[]) { } // fix it to private and set getters.

    get _id() {
        return this.id;
    }

    set _id(id: number) {
        this.id = id;
    }

    get _name() {
        return this.name;
    }

    set _name(name: string) {
        this.name = name;
    }

    get _email(): string {
        return this.email;
    }

    set _email(email: string) {
        this.email = email;
    }

    get _password(): string {
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

    public static company(data: Company): Company {
        let company: Company = new Company(0, "", "", "", []);
        Object.assign(company, data);
        return company;
    }

}
