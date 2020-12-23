import { Customer } from './customer';

export class Payment {
    paymentFrom: string;
    paymentTo: string;
    customer: Customer; 
    creationDate: Date;
    amount: number;
    months: number;
    mode: string;
}