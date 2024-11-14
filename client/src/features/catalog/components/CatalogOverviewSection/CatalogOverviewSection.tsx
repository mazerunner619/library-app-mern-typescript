import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './CatalogOverviewSection.css';
import { Book } from '../../../../models/Book';
import { BookCard } from '../../../book';
import { PlayArrowRounded } from "@mui/icons-material";
import axios from 'axios';

interface CatalogOverviewSectionProps {
    label: string;
}

const CatalogOverviewSection: React.FC<CatalogOverviewSectionProps> = ({label}) => {
    const navigate = useNavigate();

    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string>("");

    const handleViewMore = () => {
        navigate(`/catalog?genre=${label}&subject=${label}`);
    }

    const fetchBooks = async() => {
        try {
            const {data} = await axios.get(`/api/book/query?genre=${label}`);
                setBooks(data.page.items);
                setError("");
        } catch (error:any) {
            setBooks([]);
            setError(error.message);
            console.log('catalog fetch error', error);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, [label]);

    const moveLeft = () => {
        let item = books[0];
        let reordered = books.slice(1);
        reordered.push(item);
        setBooks(reordered);
    }

    const moveRight = () => {
        let item = books[books.length-1];
        let reordered =  books.slice(0, books.length - 1);
        reordered = [item, ...reordered];
        setBooks(reordered);
    }

    return(
        <div className="catalog-overview-section">
            <div className="catalog-overview-section-top">
                <h4>{label}</h4>
                <p className="catalog-overview-section-more" onClick={handleViewMore}>View more...</p>
            </div>
            {books && books.length > 0 &&


                <div className="book-carousel">
                    <div className="book-carousel-left-button" onClick={moveLeft}>
                        <PlayArrowRounded style={{transform:"rotateZ(180deg)"}} />
                    </div>
                    <div className="book-carousel-right-button" onClick={moveRight}>
                        <PlayArrowRounded />
                    </div>
                    {
                        books.map( book => <BookCard key={book._id} book={book}/>)
                    }
                </div>
            }
            {error !== "" && <p>{error}</p>}
        </div>
    )
}

export default CatalogOverviewSection;