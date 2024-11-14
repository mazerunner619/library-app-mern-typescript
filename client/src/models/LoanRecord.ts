import { Book } from "./Book";
import { User } from "./User";

export type LoanRecord = {
  _id: string;
  status: "AVAILABLE" | "LOANED";
  loanedDate: Date;
  dueDate: Date;
  returnedDate?: Date;
  patron: string;
  employeeOut: string;
  employeeIn?: string;
  item: { title: string };
};

export type CheckoutBookPayload = {
  book: Book;
  libraryCard: string;
  employee: User;
};

export type CheckinBookPayload = {
  book: Book;
  employee: User;
};
