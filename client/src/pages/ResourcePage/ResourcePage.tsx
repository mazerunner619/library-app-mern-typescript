import { useNavigate, useParams } from "react-router-dom";
import "./ResourcePage.css"
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { loadBookByBarcode } from "../../redux/slices/BookSlice";
import { BookOverview } from "../../features/book";

const ResourcePage = () => {

    const dispatch:AppDispatch = useDispatch();
    const bookState = useSelector( (state:RootState) => state.book);

    const {barcode} = useParams();
    const navigate = useNavigate();

    useEffect( () => {
        if(barcode) {
            dispatch(loadBookByBarcode(barcode));
        }
        if(bookState.error){
            alert("couldn't open book!");
            navigate('/catalog');
        }
    },[bookState.error, barcode]);

    return(
        <div className="page">
            <div className="page-container">
                <BookOverview />
            </div>
        </div>
    )
};

export default ResourcePage;