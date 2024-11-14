import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/ReduxStore'
import { setDisplayLoad } from '../../../../redux/slices/ModalSlice'
import { determineLoanBookModalContent } from '../../utils/BookUtils'
import { Modal } from '../../../../components/modal/Modal'

const LoanBookModal:React.FC = () => {

    const currentBook = useSelector((state:RootState) => state.book.currentBook);
    const dispatch:AppDispatch = useDispatch();

    const closeModal = () => {
        dispatch(setDisplayLoad(false));
    }

    return(
        <Modal 
            toggleModal = {closeModal} 
            content  = {currentBook ? determineLoanBookModalContent(currentBook) : <></>}
        />
    )
}

export default LoanBookModal;