import React, { useRef, useState } from "react";
import "./CatalogAdvancedSearch.css"
import { useNavigate } from "react-router-dom";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { truncate } from "node:fs";

const CatalogAdvancedSearch:React.FC = () => {
    const navigate = useNavigate();
    
    const isbnRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const genreRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const handleSearch = (e:any) => {
        e.preventDefault();
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

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return(
        <>
            <p className="text-slate-500 mb-2 text-center">Advanced Book Search</p>
        <div onClick={() => {setShowFilter(!showFilter)}} className="mb-1 cursor-pointer active:shadow-lg px-2 float-right md:hidden text-slate-500">
            <FilterAltOutlinedIcon /> FILTER       
        </div>
        <div className={showFilter ? "block":"hidden md:block"}>
            <form autoComplete="off" className="md:flex md:justify-evenly md:gap-x-1">
                <div className="mb-1">
                    <input id="isbn" placeholder="ISBN" ref={isbnRef} className="catalog-advanced-form-input search-menu-input" />
                </div>
                <div className="mb-1">
                    <input id="title" placeholder="Title" ref={titleRef} className="catalog-advanced-form-input search-menu-input" />
                </div>
                <div className="mb-1">
                    <input id="author" placeholder="Author" ref={authorRef} className="catalog-advanced-form-input search-menu-input" />
                </div>
                <div className="mb-1">
                    <input id="description" placeholder="Description" ref={descriptionRef} className="catalog-advanced-form-input search-menu-input" />
                </div>
                <div className="mb-1">
                    <input id="genre" placeholder="Genre" ref={genreRef} className="catalog-advanced-form-input search-menu-input" />
                </div>
                <button className="catalog-advanced-search-button px-3 rounded-full" onClick={(e) => handleSearch(e)}>Search</button>
            </form>
        </div>
        </>
    )

}

export default CatalogAdvancedSearch;