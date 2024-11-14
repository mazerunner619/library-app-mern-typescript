import React from "react";
import "./BookHistory.css"
import BookHistoryItem from "../BookHistoryItem/BookHistoryItem";
import { LoanRecord } from "../../../../models/LoanRecord";

export interface BookHistoryProps{
    // book: Book
    records: LoanRecord[]
}
const BookHistory:React.FC<BookHistoryProps> = ({records}) => {
    return(
        <div className="book-history">
            <h2>Loan History</h2>
            <div className="book-history-box">
                {
                    records.map( rec => {
                        return(
                            <BookHistoryItem key={rec._id} record={rec}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default BookHistory;