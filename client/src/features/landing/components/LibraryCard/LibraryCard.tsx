import "./LibraryCard.css"
import libraryCardImage from "../../../../assets/librarycard.png"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../../redux/ReduxStore";
import { setDisplayLibraryCard } from "../../../../redux/slices/ModalSlice";
const LibraryCard:React.FC = () => {

    const dispatch:AppDispatch = useDispatch();

    const handleDisplayModal = () => {
        dispatch(setDisplayLibraryCard(true));
    }    

    return(
        <div className="get-library-card">
            <img src={libraryCardImage} className="get-library-card-image" alt="library-card-image" />
            <p>Get your own library card <span className="get-library-card-link" onClick={handleDisplayModal}>here</span></p>
        </div>
    )
}

export default LibraryCard;