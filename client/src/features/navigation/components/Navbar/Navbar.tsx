import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { setDisplayLogin } from "../../../../redux/slices/ModalSlice";
import {LocalLibraryRounded } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar:React.FC = () => {

    const searchItems = ['Harry Potter', 'romance', 'mystery', 'Rebecca'];
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const searchRef = useRef<HTMLInputElement>(null);
    const authState = useSelector( (state:RootState) => state.auth);
    const [showMenu, setShowMenu] = useState(false);
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
        // let toggle:HTMLElement = document.getElementById('navbarSupportedContent')!;
        // if(toggle.classList.contains('collapse'))
        //         toggle.classList.remove('collapse');
        // else toggle.classList.add('collapse');
        setShowMenu(!showMenu);
    }

    useEffect(() => {

        const dynamicPlaceholder = setInterval(() => {
            setPlaceholderIndex(prev => {
                return prev === searchItems.length-1 ? 0 : prev+1;
            });
        }, 2000);

        return () => {
            clearInterval(dynamicPlaceholder);
        }
    }, []);

    const LoginElement = () => {
        return <div className="btn-menu">
                        {
                            authState.loggedInUser ?
                            <div onClick={navigateToProfile}>
                                {authState.loggedInUser.firstName.toUpperCase()}'s Account
                            </div>
                            :
                            <div onClick={toggleLogin}>
                                Login
                            </div>
                        }
                    </div>
    }

    return(

        <nav className="shadow-2xl bg-[color:--secondary] text-white md:text-lg p-2">
            
            <div className="flex justify-between">

            <div className="cursor-pointer flex gap-2">
                <a href="/" className="hover:text-white hover:no-underline">
                    <LocalLibraryRounded sx={{transform:"rotateZ(15deg) translate(0, -1px)"}} />
                    <span className="ml-1">
                        Maezy's Library
                    </span>
                </a>
                <div>
                    <input className="focus:shadow-xl focus:outline-none text-slate-600 px-2 rounded-full" type="search" placeholder={"... "+searchItems[placeholderIndex]} aria-label="Search" ref={searchRef} onKeyDown={handleEnterSearch}/>
                </div>
            </div>
            
            <div className="gap-1 hidden md:flex cursor-pointer">
                <a className="btn-menu" href="/catalog">Catalog</a>
                    <LoginElement />
            </div>

            <div onClick={toggleNavbarButton} className="md:hidden">
                <MenuIcon />
            </div>
            </div>
            {
                showMenu && 
                <div className="justify-end mt-3 cursor-pointer gap-1 flex md:hidden">
                    <a href="/catalog" className="btn-menu">Catalog</a>
                    <LoginElement />
                </div>
            }
        </nav>
    )
}

export default Navbar;