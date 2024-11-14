import "./BookHistoryItem.css"

import React from 'react';
import {useNavigate} from 'react-router-dom';
import { LoanRecord } from "../../../../models/LoanRecord";

interface BookHistoryItemProps {
    record: LoanRecord;
}

const BookHistoryItem:React.FC<BookHistoryItemProps> = ({record}) => {

    const navigate = useNavigate();

    const visitProfile = () => {
        navigate(`/profile/${record.patron}`);
    }
    const visitLoanerProfile = () => {
        navigate(`/profile/${record.employeeOut}`);
    }
    return(
        <div className="book-history-item">
            <h4>Status: <span className={record.status === 'AVAILABLE'? 'green': 'red'}>{record.status}</span></h4>
            <div className="book-history-item-group">

            <p style={{
                cursor: 'pointer'
            }}
            onClick={visitProfile}>
                Patron: {record.patron}
            </p>

            <p>Loan Date: {new Date(record.loanedDate).toDateString()}</p>
            {
                record.status === 'AVAILABLE' && record.returnedDate && <p>Return Date: {new Date(record.returnedDate).toDateString()}</p>
            }
        </div>
            <div className="book-history-item-group">
            <p style={{
                cursor: 'pointer'
            }}
            onClick={visitLoanerProfile}>
                Loaner: {record.employeeOut}
            </p>
            <p>Return By Date: {new Date(record.dueDate).toDateString()}</p>
            {
                record.status === 'AVAILABLE' && record.employeeIn && <p>Returner: {record.employeeIn}</p>
            }
            </div>
        </div>
    )
}

export default BookHistoryItem;