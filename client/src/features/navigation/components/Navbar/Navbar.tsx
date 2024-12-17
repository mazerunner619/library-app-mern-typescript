import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { useNavigate } from "react-router-dom";
import { setDisplayLogin } from "../../../../redux/slices/ModalSlice";
import {LocalLibraryRounded } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar:React.FC = () => {

    const searchItems = ['title', 'barcode', 'author', 'harry potter', 'J.K. Rowling', 'Dune', 'Hobbit', 'Ali Hazelwood'];
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const searchRef = useRef<HTMLInputElement>(null);
    const authState = useSelector( (state:RootState) => state.auth);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const dispatch:AppDispatch = useDispatch();

    const handleEnterSearch = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == "Enter" && searchRef.current && searchRef.current.value.length > 0){
            navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current?.value}&author=${searchRef.current.value}`);
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
                                <AccountCircleIcon />{' '}Profile
                            </div>
                            :
                            <div onClick={toggleLogin}>
                                Login
                            </div>
                        }
        </div>
    }

    return(

        <nav className="shadow-2xl bg-[color:--secondary] text-white md:text-lg py-3 px-2">
            
            <div className="flex justify-between items-center gap-x-2">

            <div className="cursor-pointer flex flex-1 justify-between gap-2">
                <a href="/" className="hover:text-white hover:no-underline px-2">
                    <LocalLibraryRounded sx={{transform:"rotateZ(15deg) translate(0, -1px)"}} />
                    <span className="ml-1">
                        Maezy's Library
                    </span>
                </a>
                <div className="hidden sm:block bg-white rounded-full px-1">
                <SearchIcon sx={{color:"grey"}}/>
                    <input className="focus:shadow-xl focus:outline-none text-slate-600 px-2 rounded-full" type="search" placeholder={"... "+searchItems[placeholderIndex]} aria-label="Search" ref={searchRef} onKeyDown={handleEnterSearch} />
                </div>
            </div>
            
            <div className="gap-2 hidden sm:flex cursor-pointer">
                <a className="btn-menu" href="/catalog"><AppsIcon />{' '}Catalog</a>
                <LoginElement />
            </div>

            <div onClick={() => setShowMenu(!showMenu)} className="sm:hidden">
                <MenuIcon />
            </div>
            </div>
            {
                showMenu && 
                <div className="justify-end mt-2 cursor-pointer flex-col justify-items-end sm:hidden">
                <div className="my-2 w-full">
                    <input className="w-full focus:shadow-xl focus:outline-none text-slate-600 px-2 rounded-full" type="search" placeholder={"... "+searchItems[placeholderIndex]} aria-label="Search" ref={searchRef} onKeyDown={handleEnterSearch}/>
                </div>
                    <div className="flex">
                        <a className="btn-menu" href="/catalog"><AppsIcon />{' '}Catalog</a>
                        <LoginElement />
                    </div>
                </div>
            }
        </nav>
    )
}

export default Navbar;