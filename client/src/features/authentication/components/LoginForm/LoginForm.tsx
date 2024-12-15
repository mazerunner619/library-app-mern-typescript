import React, {useEffect, useRef} from 'react'
// import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { loginUser, resetRegisterSuccess } from '../../../../redux/slices/AuthSlice';

import './LoginForm.css'

interface LoginFormProps{
    toggleRegister():void;
}
const LoginForm:React.FC<LoginFormProps> = ({toggleRegister}) => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const {error, errorDetail} = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    const handleLogin = async(e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(emailRef.current?.value && passwordRef.current?.value){
            dispatch(loginUser({
                email:emailRef.current.value,
                password:passwordRef.current.value
            }));
        }
    }

    useEffect( () => {
        return( () => {
            dispatch(resetRegisterSuccess())
        })
    }, [])

    return(
        <form action="" className="login-form">
            <h1>Please Login</h1>
            <div className="login-form-input-group">
                <h6>Email</h6>
                <input className='login-form-input' type='email' placeholder='email' name='email' required ref={emailRef}/>
            </div>
            <div className="login-form-input-group">
                <h6>Password</h6>
                <input className='login-form-input' type='password' placeholder='password' name='password' required ref={passwordRef}/>
            </div>
            {error ? <p className='login-form-error'>{errorDetail}</p> : <></>}
            <button className='login-form-submit' onClick={handleLogin}>Login</button>
            <p>
                Don't have an account?
                <span className='login-form-register' onClick={toggleRegister}>Create one here</span>
            </p>
        </form>
    )
}

export default LoginForm;