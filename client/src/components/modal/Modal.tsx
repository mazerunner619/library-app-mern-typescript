import React from 'react';
import './Modal.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/ReduxStore';
import { setDisplayLibraryCard, setDisplayLoad, setDisplayLogin } from '../../redux/slices/ModalSlice';

interface ModalProps {
    toggleModal(): void;
    content: JSX.Element;
}

export const Modal:React.FC<ModalProps> = ({toggleModal, content}) => {

    const dispatch:AppDispatch = useDispatch();

    const closeModal = (e:React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if(target.className === 'modal-bg'){
            dispatch(setDisplayLibraryCard(false));
            dispatch(setDisplayLoad(false));
            dispatch(setDisplayLogin(false));
        }
    }

    return(
        <div className='modal-bg' onClick={closeModal}>
            <div className="modal">
                <h5 className="modal-exit" onClick={toggleModal}>x</h5>
                {content}
            </div>
        </div>
    )
}