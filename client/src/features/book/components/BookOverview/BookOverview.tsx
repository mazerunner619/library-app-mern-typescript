import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/ReduxStore";
import {BookInfo} from "../..";
import BookSubjects from "../BookSubjects/BookSubjects";
import BookAdditionalInfo from "../BookAdditionalInfo/BookAdditionalInfo";
import BookHistory from "../BookHistory/BookHistory";

const BookOverview = () => {

    const bookState = useSelector((state:RootState) => state.book);
    const user = useSelector((state:RootState) => state.auth.loggedInUser);

    return(
        <div className="book-overview">
            {
                bookState.currentBook && !bookState.loading && 
                <>
                    <BookInfo book={bookState.currentBook} />
                    <BookSubjects subjects={bookState.currentBook.subjects}/>
                    <BookAdditionalInfo book={bookState.currentBook}/>
                    {
                        user?.type === 'EMPLOYEE' && <BookHistory records={bookState.currentBookLoanRecord} />
                    }
                </>
            }
        </div>
    )
}

export default BookOverview;