import React, { useEffect, useMemo, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './CatalogOverviewSection.css';
import { Book } from '../../../../models/Book';
import { BookCard } from '../../../book';
import { PlayArrowRounded } from "@mui/icons-material";
import axios from 'axios';
// const BASE_URL = import.meta.env.VITE_BASE_URL;

interface CatalogOverviewSectionProps {
    label: string;
}

const CatalogOverviewSection: React.FC<CatalogOverviewSectionProps> = ({label}) => {
    const navigate = useNavigate();

    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string>("");
    const [bookInView, setBookInView] = useState<number>(0);
    const bookLen = useMemo(() => books.length, [books]);

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
        setBookInView(prev => (prev-1+bookLen)%bookLen);
    }

    const moveRight = () => {
        setBookInView(prev => (prev+1)%bookLen);
    }

    return(
        <div className="w-[90vw] overflow-hidden mt-2 mx-auto">
            {books && books.length > 0 &&
                <div className="relative flex justify-around items-center my-2">
                    <div className='absolute top-0 bg-green-600 text-white p-2 rounded-xl flex justify-between w-full'>
                    <h4 className="">{label}</h4>
                    <h4 className="" onClick={handleViewMore}>
                        View more...
                    </h4>
                    </div>
                    <div className="" onClick={moveLeft}>
                        <PlayArrowRounded style={{transform:"rotateZ(180deg)"}} />
                    </div>
                    <div className=''>
                        <BookCard key={books[bookInView]._id} book={books[bookInView]}/>
                    </div>
                    <div className="" onClick={moveRight}>
                        <PlayArrowRounded />
                    </div>
                </div>
            }
            {error !== "" && <p>{error}</p>}
        </div>
    )
}

export default CatalogOverviewSection;