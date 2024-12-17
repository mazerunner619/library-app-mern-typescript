import "./BookCheckin.css"

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { checkinBook, setCurrentBook } from "../../../../redux/slices/BookSlice";
import { setDisplayLoad } from "../../../../redux/slices/ModalSlice";

const BookCheckin: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.loggedInUser);
    const book = useSelector((state: RootState) => state.book.currentBook);
    const dispatch: AppDispatch = useDispatch();
    const libraryCardRef = useRef<HTMLInputElement>(null);

    const checkin = (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();
        if (book && user && libraryCardRef) {
            console.log('checkin book =---> ', book)
            dispatch(checkinBook({
                book,
                employee:user,
            }));
        }

        dispatch(setDisplayLoad(false));
        dispatch(setCurrentBook(undefined));
    }

    return(
        <div className="book-checkin">
            {
                book && user &&
                <form className="book-checkin-form">
                <h3>Loan Book Titled: {book.title}</h3>
                <h4>Check-in Employee ID: </h4>
                <input className="book-checkin-input" value={user._id} disabled />
                <button className="book-checkin-button" onClick={checkin}>Check-in Book</button>
                </form>
            }
        </div>
    )
}

export default  BookCheckin;
