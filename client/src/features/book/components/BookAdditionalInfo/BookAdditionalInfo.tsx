import React from "react";
import "./BookAdditionalInfo.css"
import { Book } from "../../../../models/Book";

interface BookAdditionalInfoProps{
    book:Book;
}

const BookAdditionalInfo:React.FC<BookAdditionalInfoProps> = ({book}) => {
    return(
        <div className="h-fit additional-book-info">
                    <p className="sm:text-center my-2 border-b-2 p-2">Publisher: {book.publisher}</p>
            <div className="gap-y-2 gap-2 additional-book-info-container flex-col md:flex-row">
            <div className="w-full items-start additional-book-info-group gap-y-2">
                    <p className="additional-book-info-text">ISBN:</p>
                    <h4 className="additional-book-info-text">{book.barcode}</h4>
                </div>
                <div className="w-full items-start additional-book-info-group gap-y-2">
                    <p className="additional-book-info-text">Pages:</p>
                    <h4 className="additional-book-info-text">{book.pages}</h4>
                </div>
                <div className="w-full items-start additional-book-info-group gap-y-2">
                    <p className="additional-book-info-text">Published On:</p>
                    <h4 className="additional-book-info-text">{new Date(book.publicationDate).toDateString()}</h4>
                </div>
            </div>
        </div>
    )
};

export default BookAdditionalInfo;