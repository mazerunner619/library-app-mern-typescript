import React, { useRef } from "react";
import "./CatalogAdvancedSearch.css"
import { useNavigate } from "react-router-dom";

const CatalogAdvancedSearch:React.FC = () => {
    const navigate = useNavigate();
    
    const isbnRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const genreRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {

        let query = '';
        if(isbnRef && isbnRef.current && isbnRef.current.value !== '')
            query += `&barcode=${isbnRef.current.value}`;
        if(titleRef && titleRef.current && titleRef.current.value !== '')
            query += `&title=${titleRef.current.value}`;
        if(genreRef && genreRef.current && genreRef.current.value !== '')
            query += `&genre=${genreRef.current.value}`;
        if(descriptionRef && descriptionRef.current && descriptionRef.current.value !== '')
            query += `&description=${descriptionRef.current.value}`;
        if(subjectRef && subjectRef.current && subjectRef.current.value !== '')
            query += `&subject=${subjectRef.current.value}`;
        if(authorRef && authorRef.current && authorRef.current.value !== '')
            query += `&author=${authorRef.current.value}`;
        if(query !== '')
            query = '?' + query.slice(1);

        if(query !== ''){
            navigate(`/catalog${query}`)
        }
    }

    return(
        <div className="catalog-advanced-search">
            <h2>Advanced Book Search</h2>
            <form className="catalog-advanced-search-form">
                <div className="catalog-advanced-form-input-group">
                    <p>ISBN</p>
                    <input id="isbn" placeholder="ISBN" ref={isbnRef} className="catalog-advanced-form-input" />
                </div>
                <div className="catalog-advanced-form-input-group">
                    <p>Title</p>
                    <input id="title" placeholder="Title" ref={titleRef} className="catalog-advanced-form-input" />
                </div>
                <div className="catalog-advanced-form-input-group">
                    <p>Author</p>
                    <input id="author" placeholder="Author" ref={authorRef} className="catalog-advanced-form-input" />
                </div>
                <div className="catalog-advanced-form-input-group">
                    <p>Description</p>
                    <input id="description" placeholder="Description" ref={descriptionRef} className="catalog-advanced-form-input" />
                </div>
                <div className="catalog-advanced-form-input-group">
                    <p>Genre</p>
                    <input id="genre" placeholder="Genre" ref={genreRef} className="catalog-advanced-form-input" />
                </div>
            </form>
            <button className="catalog-advanced-search-button" onClick={handleSearch}>Search</button>
        </div>
    )

}

export default CatalogAdvancedSearch;