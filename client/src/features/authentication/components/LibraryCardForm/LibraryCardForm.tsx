import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { setDisplayLibraryCard, setDisplayLogin } from "../../../../redux/slices/ModalSlice";
import { getLibraryCard } from "../../../../redux/slices/AuthSlice";


const LibraryCardForm = () => {

    const dispatch:AppDispatch = useDispatch();
    const userState = useSelector( (state:RootState) => state.auth);

    const handleLogin = () => {
        dispatch(setDisplayLibraryCard(false));
        dispatch(setDisplayLogin(true));
    }

    const handleCreateLibraryCard = () => {
        if(userState.loggedInUser){
            dispatch(getLibraryCard(userState.loggedInUser._id));
        }
    }

    return(
        <>
        {
            userState.loggedInUser ? 
            <div className="register-library-card-container">
                <h3 className="register-library-card-text">Welcome! {userState.loggedInUser.firstName} {userState.loggedInUser.lastName}, good day</h3>
                {
                    userState.libraryCard ? 
                    <p className="register-library-card-text">Your library card number : {userState.libraryCard}</p>
                    :
                    <>
                        <h4 className="register-library-card-text">Use the button below to get you new/forgotten library card</h4>
                        <button className="register-library-modal-button" onClick={handleCreateLibraryCard}>Get Library Card</button>
                    </>
                }
                
            </div>
            :
            <div className="register-library-card-container">
                <h3 className="register-library-card-text">You must be a member of Library to get a card!</h3>
                <h4 className="register-library-card-text">Use the button below to register yourself for free or login</h4>
                <button className="register-library-modal-button" onClick={handleLogin}>New here?</button>
            </div>
        }
        </>
    )
}

export default LibraryCardForm;