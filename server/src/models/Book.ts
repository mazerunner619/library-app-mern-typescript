import { ILoanRecord } from "./LoanRecord";

export interface IBook {
    barcode:string;
    cover:string;
    title:string;
    authors:string[];
    description:string;
    subjects:string[];
    publicationDate:string;
    publisher:string;
    pages:string;
    genre:string;
    records:string[];
    status:'AVAILABLE' | 'LOANED';
}