import { useEffect, useState } from "react"
import { BookInfo } from "../../../book"
import "./BookOfTheWeek.css"
import { Book } from "../../../../models/Book";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const BookOfTheWeek:React.FC = () => {

    const [book, setBook] = useState<Book | null>(null);
    const [error, setError] = useState<string>("");
    
    const fetchBookOfTheWeek = async() => {
        try {
            const {data} = await axios.get(BASE_URL+'/api/book-of-the-week');
            setBook(data);
        } catch (error:any) {
            setError(error.message);
        }
    }

    useEffect(() => {
        console.log('base url ----- ', BASE_URL)
        fetchBookOfTheWeek();
    }, []);

    const loadOrError = () => {
        return error === '' ? "Loading..." : <p style={{color:"red"}}>oops! {error}</p>;
    }

    return(
        <div className="book-of-the-week">
            <h1>Book of the Week</h1>
            <hr />
            {
                book ?
                <>
                    <BookInfo book={book}/>
                    <a href={`/resource/${book.barcode}`} target="_blank">
                        <button>have a look 👀</button>                    
                    </a>
                </>
                :
                <>
                {loadOrError()}
                </>
            }
        </div>
    )
}

export default BookOfTheWeek;