import { Customer } from './customer';

export class Payment {
    paymentFrom: string;
    paymentTo: string;
    customer: Customer; 
    amount: number;
}