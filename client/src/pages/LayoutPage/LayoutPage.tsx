import "./LayoutPage.css"
import { RootState } from "../../redux/ReduxStore";
import React from "react";
import { useSelector } from "react-redux";
import { LibraryCardModal, LoginRegisterModal } from "../../features/authentication";
import { Outlet } from "react-router-dom";
import {Navbar} from "../../features/navigation";
import { LoanBookModal } from "../../features/book";

const LayoutPage:React.FC = () => {
    const state = useSelector( (state:RootState) => state.modal);

    return(
        <div className="layout-page">
            {state.displayLogin && <LoginRegisterModal />}
            {state.displayLibraryCard && <LibraryCardModal />}
            {state.displayLoad && <LoanBookModal />}
            <Navbar />
            <Outlet />
            <footer className="footer">
                <a href="https://github.com/mazerunner619" target="_blank">Author : github@mazerunner619</a>
            </footer>
        </div>
    )
}

export default LayoutPage;