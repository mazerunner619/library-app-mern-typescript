import "./RegisterForm.css"
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { registerUser, resetRegisterSuccess } from "../../../../redux/slices/AuthSlice";

interface RegisterFormProps {
    toggleLogin(): void;
}

export const RegisterForm:React.FC<RegisterFormProps> = ({toggleLogin}) => {
    const {error, errorDetail} = useSelector( (state:RootState) => state.auth);

    const firstRef = useRef<HTMLInputElement>(null);
    const lastRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleRegisterUser = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(firstRef.current && lastRef.current && emailRef.current && passwordRef.current) {
            dispatch(registerUser({
                type:'PATRON',
                email: emailRef.current.value,
                firstName : firstRef.current.value,
                lastName:lastRef.current.value,
                password:passwordRef.current.value
            }));
        }
    }

    useEffect( () => {
        return (() => {
            dispatch(resetRegisterSuccess())
        })
    }, [])

    const dispatch:AppDispatch = useDispatch();

    return(
        <form className="login-form">
            <span className='text-lg'>Please Register!</span>
            <div className="login-form-input-group">
                <h6>First Name</h6>
                <input className='login-form-input' type='text' placeholder='first name' name='firstname' required ref={firstRef}/>
            </div>
            <div className="login-form-input-group">
                <h6>Last Name</h6>
                <input className='login-form-input' type='text' placeholder='last name' name='lastname' required ref={lastRef}/>
            </div>
            <div className="login-form-input-group">
                <h6>Email</h6>
                <input className='login-form-input' type='email' placeholder='email' name='email' required ref={emailRef}/>
            </div>
            <div className="login-form-input-group">
                <h6>Password</h6>
                <input className='login-form-input' type='password' placeholder='password' name='password' required ref={passwordRef}/>
            </div>
            {error ? <p className='login-form-error'>{errorDetail}</p> : <></>}
            <button className='login-form-submit' onClick={handleRegisterUser}>Register</button>
            <div>
                Already have an account?
                <span className='login-form-register' onClick={toggleLogin}>Sign In</span>
            </div>
        </form>
    )
}