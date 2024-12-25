import "./ProfileLoanRecord.css"

import React from 'react';
import { LoanRecord } from "../../../../models/LoanRecord";
interface ProfileLoanRecordProps{
    record: LoanRecord; 
}

export const ProfileLoanRecord: React.FC<ProfileLoanRecordProps> = ({record}) => {
    return(
        <div className="profile-record mb-2 p-1">
            <p className="overflow-ellipsis">Title: {record.item.title}</p>
            <p className={record.status === "AVAILABLE" ? "bg-green-200 p-1 rounded-r-full" : "bg-red-200 p-1"}>Status: {record.status === "AVAILABLE" ? "RETURNED": "LOANED"}</p>
            <h4>Loan Date: {new Date(record.loanedDate).toDateString()}</h4> <h4>Return by Date: {new Date(record.dueDate).toDateString()}</h4>
            {record.returnedDate && <h4>Date Returned: {new Date(record.returnedDate).toDateString()}</h4>}
        </div>
    )
}