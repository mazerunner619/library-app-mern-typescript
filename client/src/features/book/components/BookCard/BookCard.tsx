import React, { useEffect, useState } from "react";
import { Book } from "../../../../models/Book"
import "./BookCard.css"
import { useNavigate } from "react-router-dom";
import { mapAuthorsToString } from "../../utils/BookUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { setCurrentBook } from "../../../../redux/slices/BookSlice";
import { setDisplayLoad } from "../../../../redux/slices/ModalSlice";

interface BookCardProps {
    book:Book;
}

const Component:React.FC<BookCardProps> = ({book}) => {

    const navigate = useNavigate();

    const {loggedInUser} = useSelector( (state:RootState) => state.auth);
    const dispatch:AppDispatch = useDispatch();
    
    const [available] = useState<boolean>(() => {
        if(!book.status || book.status === 'AVAILABLE')
                return true;
        return false;
    });

    const [buttonClass, setButtonClass] = useState<string>("");

    const handleLoan = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if(loggedInUser?.type === 'EMPLOYEE'){
            dispatch(setCurrentBook(book));
            dispatch(setDisplayLoad(true));
        }
    }

    useEffect( () => {
        let c = 'book-card-loan-button';
        if(available)
            c += " available";
        else c += " unavailable";

        if(loggedInUser && loggedInUser.type === 'EMPLOYEE'){
            if(available)
                c += " checkout";
            else c += " checkin";
        }

        setButtonClass(c);
    }, [loggedInUser, loggedInUser?.type, book.records]);

    const displaybook = () => {
        navigate(`/resource/${book.barcode}`);
    }

    return(

        <div className="book-card">
            <img src={book.cover} alt="book-card-cover" className="book-card-cover" />
            <div className="book-card-info" onClick={displaybook}>
                <h1 className="book-card-title">{ book.title}</h1>
                <h3 className="book-card-author">{mapAuthorsToString(book)}</h3>
                <p className="book-card-description">{book.description}</p>
            </div>
            {
                loggedInUser && loggedInUser.type === 'EMPLOYEE' ? 
                <button className={buttonClass} onClick={handleLoan}>{available?'Checkout':'Checkin'}</button>
                :
                <button className={buttonClass}>Status : {available?'AVAILABLE':'UNAVAILABLE'}</button>
            }
        </div>
    )
}

export default Component;