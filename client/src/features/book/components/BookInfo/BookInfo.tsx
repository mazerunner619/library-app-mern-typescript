import './BookInfo.css'
import { Book } from "../../../../models/Book"
import { mapAuthorsToString } from '../../utils/BookUtils';

interface BookInfoProps {
    book:Book;
}

export const BookInfo:React.FC<BookInfoProps> = ({book}) => {


    return(
            <div className="book-info-container">
                    <img className='book-info-cover' src={book.cover}/>
                    <h1></h1>
                    <h2>{book.title}</h2>
                    <h3>{mapAuthorsToString(book)}</h3>
                    <p className='book-description'>{book.description}</p>
            </div>
    )
}