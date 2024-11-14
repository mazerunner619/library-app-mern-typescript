import React from "react";
import "./BookSubjects.css"

export interface BookSubjectsProps {
    subjects:string[]
}

const BookSubjects:React.FC<BookSubjectsProps> = ({subjects}) => {
    return(
        <div className="book-subjects">
            <h3>Book Subjects: </h3>
            <div className="book-info-subjects-box">
                {
                    subjects.map((sub, ind) => {
                        if(ind !== subjects.length-1)
                            return `${sub}, `;
                        else
                        return `${sub}`;
                    })
                }
            </div>
        </div>
    )
}

export default BookSubjects;