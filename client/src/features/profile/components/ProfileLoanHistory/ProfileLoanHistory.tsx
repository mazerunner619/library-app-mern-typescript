import "./ProfileLoanHistory.css"

import axios from "axios";
import { useState, useEffect } from "react";
import { LoanRecord } from "../../../../models/LoanRecord";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/ReduxStore";
import { ProfileLoanRecord } from "../ProfileLoanRecord/ProfileLoanRecord";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const ProfileLoanHistory = () => {

    const user = useSelector( (state: RootState) => state.auth.profileUser);
    const [records, setRecords] = useState<LoanRecord []> ([]);

        const fetchRecordsForUser = async() => {
            console.log('fetching users history', user)
            if(user) {
                try{
                let res = await axios.post(BASE_URL+'/api/record/query', {
                    property: "patron",
                    value: user._id
                });
                let r = res.data.records;
                console.log(r);
                setRecords (r);
                } catch(e:any){
                    console.log(e.message);
                }
            }
        }

    useEffect(() => {
        fetchRecordsForUser();
    }, [user]);

    return(
        <div className="profile-loan-history">
        <h3 className="profile-loan-header">{user?.firstName}'s Item Loan History:</h3>
        {
            records.map((record)=> {
            return(
                <ProfileLoanRecord key={record._id} record={record} />
            )
            })
        }
        </div>
    )

}

export default ProfileLoanHistory;