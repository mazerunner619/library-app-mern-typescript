import './LoginRegisterModal.css'
import {Modal} from '../../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/ReduxStore'
import { useEffect, useState } from 'react'
import { setDisplayLogin } from '../../../../redux/slices/ModalSlice'
import LoginForm from '../LoginForm/LoginForm'
import { RegisterForm } from '../RegisterForm/RegisterForm'

export const LoginRegisterModal:React.FC = () => {

    const authSatate = useSelector((state:RootState) => state.auth);
    const dispatch:AppDispatch = useDispatch();

    const [login, setLogin] = useState<boolean>(true);

    const closeModal = () => {
        dispatch(setDisplayLogin(false));
    }

    const toggleLogin = () => {
        setLogin(!login);
    }

    useEffect(() => {
        if(authSatate.loggedInUser)
                closeModal();
        
        return(() => {
            if(authSatate.loggedInUser){
                localStorage.setItem('userId', authSatate.loggedInUser._id);
            }
        })
        
    }, [authSatate.loggedInUser])

    return(
        <Modal 
            toggleModal = {closeModal} 
            content  = {login ? <LoginForm toggleRegister={toggleLogin}/> : <RegisterForm toggleLogin={toggleLogin}/>}
        />
    )
}