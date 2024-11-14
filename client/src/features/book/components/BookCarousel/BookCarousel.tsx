import "./BookCarousel.css"

import { useState } from "react";
import { Book } from "../../../../models/Book";
import { BookCard } from "../..";
import { PlayArrowRounded } from "@mui/icons-material";

interface BookCarouselProps{
    books:Book[]
}

const BookCarousel: React.FC<BookCarouselProps> = ({books}) => {
    
    const [order, setorder] = useState<Book[]>(books);

    const moveLeft = () => {
        let item = order[0];
        let reordered = order.slice(1);
        reordered.push(item);
        setorder (reordered);
    }

    const moveRight = () => {
        let item = order[order.length-1];
        let reordered =  order.slice(0, order.length - 1);
        reordered = [item, ...reordered];
        setorder (reordered);
    }

    return(
        <div className="book-carousel">
            <div className="book-carousel-left-button" onClick={moveLeft}>
                <PlayArrowRounded style={{transform:"rotateZ(180deg)"}} />
            </div>
            <div className="book-carousel-right-button" onClick={moveRight}>
                <PlayArrowRounded />
            </div>
            {
                order.map( book => <BookCard key={book._id} book={book}/>)
            }
        </div>
    )
}

export default BookCarousel;