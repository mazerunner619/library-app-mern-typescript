import React from "react";
import { AppDispatch } from "../../../../redux/ReduxStore";
import { useDispatch } from "react-redux";
import { setDisplayLibraryCard } from "../../../../redux/slices/ModalSlice";
import { Modal } from "../../../../components";
import LibraryCardForm from "../LibraryCardForm/LibraryCardForm";

const LibraryCardModal:React.FC = () => {
    
    const dispatch:AppDispatch = useDispatch();

    const closeModal = () => {
        dispatch(setDisplayLibraryCard(false));
    }

    return(
    <Modal toggleModal={closeModal} content={<LibraryCardForm />} />
    )
}

export default LibraryCardModal;