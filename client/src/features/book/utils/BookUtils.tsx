import { Book } from "../../../models/Book";
import BookCheckin from "../components/BookCheckin/BookCheckin";
import BookCheckout from "../components/BookCheckout/BookCheckout";

export const mapAuthorsToString = (book:Book) => {
    let authors = "";
    let i = 0;
    for(i = 0; i < book.authors.length-1; i++){
        authors += book.authors[i];
        authors += ", ";
    }
    authors += book.authors[i];
    return authors;
}

export const determineLoanBookModalContent = (book:Book):JSX.Element => {
    let availability = (!book.status || book.status === 'AVAILABLE') ? true : false;
    if(availability)
            return <BookCheckout />
    else return <BookCheckin />
}