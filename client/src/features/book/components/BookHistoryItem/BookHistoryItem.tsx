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

    const visitReturnerProfile = () => {
        if(record.employeeIn)
            navigate(`/profile/${record.employeeIn}`);
    }
    return(
        <div className="">
            <div className="flex flex-wrap gap-2 mt-2 border-l-2 border-secondary p-1 text-ellipsis text-slate-500 justify-between">
            <div className="">  
               <div>Status: <span className={record.status === 'AVAILABLE'? 'green': 'red'}>{record.status}</span></div>
                <div onClick={visitProfile}>
                    Patron: <span className="cursor-pointer text-primary italic">{record.patron}</span>
                </div>
                <div onClick={visitLoanerProfile}>
                    Loaner: <span className="cursor-pointer text-primary italic">{record.employeeOut}</span>
                </div>
                {
                    record.status === 'AVAILABLE' && record.employeeIn && <div onClick={visitReturnerProfile}>
                        Returner: <span className="cursor-pointer text-primary italic">{record.employeeIn}</span>
                    </div>
                }
            </div>
            <div>
                <br />
                <div>Return By Date: {new Date(record.dueDate).toDateString()}</div>
                <div>Loan Date: {new Date(record.loanedDate).toDateString()}</div>
                {
                    record.status === 'AVAILABLE' && record.returnedDate && <div>Return Date: {new Date(record.returnedDate).toDateString()}</div>
                }
            </div>
            </div>
        </div>
    )
}

export default BookHistoryItem;