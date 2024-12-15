import React from 'react';
import './Modal.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/ReduxStore';
import { setDisplayLibraryCard, setDisplayLoad, setDisplayLogin } from '../../redux/slices/ModalSlice';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

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
                <h5 className="p-1 text-center cursor-pointer" onClick={toggleModal}><HighlightOffTwoToneIcon /></h5>
                {/* <hr className='text-black w-1/2 mb-1'/> */}
                <hr className='mb-2 border-1 w-1/2 border-slate-500' />
                {content}
            </div>
        </div>
    )
}