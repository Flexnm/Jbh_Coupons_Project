import { Category } from './category.enum';

export class Coupon {

    constructor(private id: number, private companyId: number, private category: Category, private title: string, private description: string, private startDate: Date, private endDate: Date, private amount: number, private price: number, private image: string) {

    }

    get _id(): number {
        return this.id;
    }

    set _id(id: number) {
        this.id = id;
    }

    get _companyId(): number {
        return this.companyId;
    }

    set _companyId(companyId: number) {
        this.companyId = companyId;
    }

    get _category(): Category {
        return this.category;
    }

    set _category(category: Category) {
        this.category = category;
    }

    get _title(): string {
        return this.title;
    }

    set _title(title: string) {
        this.title = title;
    }

    get _description(): string {
        return this.description;
    }

    set _description(description: string) {
        this.description = description;
    }

    get _startDate(): Date {
        return this.startDate;
    }

    set _startDate(startDate: Date) {
        this.startDate = startDate;
    }

    get _endDate(): Date {
        return this.endDate;
    }

    set _endDate(endDate: Date) {
        this.endDate = endDate;
    }

    get _amount(): number {
        return this.amount;
    }

    set _amount(amount: number) {
        this.amount = amount;
    }

    get _price(): number {
        return this.price;
    }

    set _price(price: number) {
        this.price = price;
    }

    get _image(): string {
        return window.atob(this.image);
    }

    set _image(image: string) {
        this.image = image;
    }

    public static coupon(data: Coupon): Coupon {
        let coupon: Coupon = new Coupon(0, 0, null, "", "", null, null, 0, 0, "");
        Object.assign(coupon, data);
        return coupon;
    }

    public static coupons(data: Coupon[]): Coupon[] {
        data = data.map((coupon) => Coupon.coupon(coupon));
        return data;
    }



}
