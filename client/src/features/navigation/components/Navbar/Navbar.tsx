import React, {useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { setDisplayLogin } from "../../../../redux/slices/ModalSlice";
import {LocalLibraryRounded } from "@mui/icons-material";

const Navbar:React.FC = () => {

    const searchRef = useRef<HTMLInputElement>(null);
    const authState = useSelector( (state:RootState) => state.auth);
    
    const navigate = useNavigate();

    const dispatch:AppDispatch = useDispatch();

    const handleEnterSearch = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == "Enter" && searchRef.current && searchRef.current.value.length > 0){
            navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current?.value}&description=${searchRef.current.value}`);
            searchRef.current.value='';
        }
    }

    const handleClickSearch = () => {
        if(searchRef.current && searchRef.current.value.length > 0){
            navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
            searchRef.current.value='';
        }
    }

    const navigateToProfile = () => {
        if(authState.loggedInUser)
            navigate(`/profile/${authState.loggedInUser._id}`);
    }

    const toggleLogin = () => {
        dispatch(setDisplayLogin(true));
    }

    const toggleNavbarButton = () => {
        let toggle:HTMLElement = document.getElementById('navbarSupportedContent')!;
        if(toggle.classList.contains('collapse'))
                toggle.classList.remove('collapse');
        else toggle.classList.add('collapse');
    }

    return(

        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#0DAB76"}}>            
        <Link className="navbar-brand" to="/"><LocalLibraryRounded sx={{transform:"rotateZ(15deg) translate(0, 4px)"}} />My Library</Link>
        <button onClick={toggleNavbarButton} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            <div className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" ref={searchRef} onKeyDown={handleEnterSearch}/>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleClickSearch}>Search</button>
            </div>
            
            <ul className="navbar-nav ml-auto">

            <NavLink 
                to="/catalog" 
                className="nav-link navbar-brand nav-item active"
                style={
                    ({isActive}) => {
                        return {
                            textShadow: isActive? "2px -2px 5px black":""
                        };
                    }
                }
            >
                    View Catalog
            </NavLink>

            <li className="nav-item active" style={{cursor:'pointer'}}>
                {
                    authState.loggedInUser ? 
                    <div className="nav-link navbar-brand" onClick={navigateToProfile}>
                        {authState.loggedInUser.firstName.toUpperCase()}'s Account
                    </div>
                    :
                    <div onClick={toggleLogin} className="nav-link navbar-brand">Login</div>
                }
            </li>
            </ul>
        </div>
        </nav>
    )
}

export default Navbar;