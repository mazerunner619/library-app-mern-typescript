import "./ProfileLoanRecord.css"

import React from 'react';
import { LoanRecord } from "../../../../models/LoanRecord";
interface ProfileLoanRecordProps{
    record: LoanRecord; 
}

export const ProfileLoanRecord: React.FC<ProfileLoanRecordProps> = ({record}) => {
    return(
        <div className="profile-record">
            <h4>Title: {record.item.title}</h4>
            <h4 className={record.status === "AVAILABLE" ? "bg-green-400 px-1" : "bg-red-400 px-1"}>Status: {record.status === "AVAILABLE" ? "RETURNED": "LOANED"}</h4>
            <p>Loan Date: {new Date(record.loanedDate).toDateString()}</p> <p>Return by Date: {new Date(record.dueDate).toDateString()}</p>
            {record.returnedDate && <p>Date Returned: {new Date(record.returnedDate).toDateString()}</p>}
        </div>
    )
}