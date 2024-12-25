import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { setDisplayLibraryCard, setDisplayLogin } from "../../../../redux/slices/ModalSlice";
import { getLibraryCard } from "../../../../redux/slices/AuthSlice";
import { useState } from "react";


const LibraryCardForm = () => {

    const dispatch:AppDispatch = useDispatch();
    const userState = useSelector( (state:RootState) => state.auth);
    const [copied, setCopied] = useState(false);
    let tm:NodeJS.Timeout;

    const handleLogin = () => {
        dispatch(setDisplayLibraryCard(false));
        dispatch(setDisplayLogin(true));
    }

    const handleCreateLibraryCard = () => {
        if(userState.loggedInUser){
            dispatch(getLibraryCard(userState.loggedInUser._id));
        }
    }

    function copyToClipboard() {
        var copyText = document.getElementById("tobecopied")!;
        navigator.clipboard.writeText(copyText.innerHTML);
        setCopied(true);
        clearTimeout(tm);
        tm = setTimeout(() => setCopied(false), 1000)
    }

    return(
        <>
        {
            userState.loggedInUser ? 
            <div className="register-library-card-container">
                <h3 className="register-library-card-text">Welcome! {userState.loggedInUser.firstName} {userState.loggedInUser.lastName}, good day</h3>
                {
                    userState.libraryCard ? 
                    <>
                    <p className="register-library-card-text">Your library card number : <span className="cursor-copy" style={{color:copied?"green":"black"}} id="tobecopied" onClick={copyToClipboard}>{userState.libraryCard}</span></p>
                    <p className="text-sm text-green-500">{copied && "copied"}</p>
                    </>
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
                <button className="register-library-modal-button text-blue-700" onClick={handleLogin}>New here?</button>
            </div>
        }
        </>
    )
}

export default LibraryCardForm;