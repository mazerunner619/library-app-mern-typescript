import { useDispatch, useSelector } from "react-redux";
import "./CatalogSearch.css"
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { queryBooks } from "../../../../redux/slices/BookSlice";
import { BookCard } from "../../../book";
import CatalogAdvancedSearch from "../CatalogAdvancedSearch/CatalogAdvancedSearch";
import CatalogSearchPageNavigator from "../CatalogSearchPageNavigator/CatalogSearchPageNavigator";


const CatalogSearch:React.FC = () => {

    const bookState = useSelector((state:RootState) => state.book)
    const dispatch:AppDispatch = useDispatch();
    const location = useLocation();
    
    useEffect( ()=>{
        dispatch(queryBooks(location.search));
    }, [location.search]);

    return(
        <div className="catalog-search">
            <div className="catalog-search-advanced-search-section">
                <CatalogAdvancedSearch />
            </div>
            {
                bookState.loading ? 
                <>hold on a second...</>
                :
                <div>
                    {
                        bookState.pagingInfo &&
                        <h2 className="p-2 text-center bg-[color:--secondary] text-white my-2 rounded-lg">Displaying {bookState.pagingInfo?.pageCount} books out of {bookState.pagingInfo?.totalCount}</h2>
                    }
                    <div className="catalog-search-item-area">
                        {bookState.books.map( book => <BookCard key={book.barcode} book={book} />)}
                    </div>
                    <div className="catalog-search-pages">
                        <CatalogSearchPageNavigator />
                    </div>
                </div>
            }
            {
                bookState.error && <p style={{color:"red"}}>Oops! {bookState.error}</p>
            }

        </div>
    )
};

export default CatalogSearch;