import './CatalogSearchPageNavigator.css'

import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../../../redux/ReduxStore";
import { calculatePaging } from "../../utils/CatalogUtils";
import { PlayArrowRounded } from '@mui/icons-material';

const CatalogSearchPageNavigator:React.FC = () => {

    const {pagingInfo} = useSelector( (state:RootState) => state.book)

    const navigate = useNavigate();
    const {search} = useLocation();

    const navigatePrev = () => {
        if(pagingInfo && pagingInfo.currentPage > 1){
            if(search.includes('&page=')){
                let splitStr = search.split("&page=");
                let newSearch = splitStr[0] + `&page=${pagingInfo.currentPage-1}`;
                navigate(`/catalog${newSearch}`);
            }else{
                let newSearch = search + `&page=${pagingInfo.currentPage-1}`;
                navigate(`/catalog${newSearch}`);
            }
        }
    }


    const navigateToPage = (e:React.MouseEvent<HTMLParagraphElement>) => {
        const pageNo = e.currentTarget.id;
        if(pageNo === '..')
                return;
        if(search.includes('&page=')){
            let splitStr = search.split("&page=");
            let newSearch = splitStr[0] + `&page=${pageNo}`;
            navigate(`/catalog${newSearch}`);
        }else{
            let newSearch = search + `&page=${pageNo}`;
            navigate(`/catalog${newSearch}`);
        }
    }


    const navigateNext = () => {
        if(pagingInfo && pagingInfo.currentPage !== pagingInfo.totalPages){
            if(search.includes('&page=')){
                let splitStr = search.split("&page=");
                let newSearch = splitStr[0] + `&page=${pagingInfo.currentPage+1}`;
                navigate(`/catalog${newSearch}`);
            }else{
                let newSearch = search + `&page=${pagingInfo.currentPage+1}`;
                navigate(`/catalog${newSearch}`);
            }
        }
    }

    return(
       <div className="catalog-search-page-navigator">
        {
            pagingInfo && pagingInfo.currentPage > 1 && <p className="catalog-search-page-navigator-navigate" onClick={navigatePrev}><PlayArrowRounded style={{transform:"rotateZ(180deg) translate(0, -10px"}}/></p>
        }
        <div className="catalog-search-page-numbers">
            {
                pagingInfo && calculatePaging(pagingInfo).map( num => {
                    if(num === `${pagingInfo.currentPage}`)
                        return <p key={num} id={num} className="catalog-search-page-number number-active">{num}</p>
                    else
                        return <p key={num} id={num} className="catalog-search-page-number" onClick={navigateToPage}>{num}</p>
                })
            }
        </div>
        {
            pagingInfo && pagingInfo.currentPage < pagingInfo.totalPages && <p className="catalog-search-page-navigator-navigate" onClick={navigateNext}><PlayArrowRounded style={{transform:"translate(0, 10px"}}/></p>
        }
       </div>
    )
}

export default CatalogSearchPageNavigator;