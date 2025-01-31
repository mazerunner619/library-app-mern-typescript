import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../redux/ReduxStore"
import { User } from "../../../../models/User";
import { useNavigate } from "react-router-dom";
import { Create } from "@mui/icons-material";
import { resetUser, updateUser } from "../../../../redux/slices/AuthSlice";
import './updateUserForm.css'

const UpdateUserForm:React.FC = () => {

    const dispatch:AppDispatch = useDispatch();
    const userState = useSelector( (state:RootState) => state.auth);
    const [user, setUser] = useState<User | undefined>(userState.profileUser);
    const [displayUpdate, setDisplayUpdate] = useState<boolean>(false);

    const navigate = useNavigate();

    const updateUserState = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDisplayUpdate(true);
        if(e.target.value && e.target.name && user){
            setUser({
                ...user,
                [e.target.name] : e.target.value
            })
        }
    }

    const submitUpdateUser = async(e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if(user)
                await dispatch(updateUser(user));
            setDisplayUpdate(false);
            alert('updated!')
        } catch (error) {
            alert('opps! something is wrong')
        }
    }

    const logout = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.removeItem("userId");
        dispatch(resetUser("loggedInUser"));
        dispatch(resetUser("profileUser"));
        navigate("/");
    }

    useEffect(() => {
        if(!user){
            setUser(userState.profileUser);
        }
    }, [user, userState.profileUser]);

    return(
        <form className="update-user-form">
            <div className="update-user-input-group">
            <h4>First Name: </h4>
            <input className="update-user-input" name="firstName" value={user?.firstName} onChange={updateUserState} disabled={userState.loggedInUser?._id !== userState.profileUser?._id}/>
                {userState.loggedInUser?._id === userState.profileUser?._id && <Create sx={{
                    position: 'absolute',
                    top: '65%',
                    right: '0'
                }}/>
                }
            </div>

            <div className="update-user-input-group">
            <h4>Last Name: </h4>
            <input className="update-user-input" name="lastName" value={user?.lastName} onChange={updateUserState} disabled={userState.loggedInUser?._id !== userState.profileUser?._id}/>
                {userState.loggedInUser?._id === userState.profileUser?._id && <Create sx={{
                    position: 'absolute',
                    top: '65%',
                    right: '0'
                }}/>
                }
            </div>

            <div className="update-user-input-group">
            <h4>Email: </h4>
            <input className="update-user-input" name="email" value={user?.email} onChange={updateUserState} disabled={userState.loggedInUser?._id !== userState.profileUser?._id}/>
                {userState.loggedInUser?._id === userState.profileUser?._id && <Create sx={{
                    position: 'absolute',
                    top: '65%',
                    right: '0'
                }}/>
                }
            </div>

            {displayUpdate ? <button className="profile-button" onClick={submitUpdateUser}>Update Profile</button> : <></>}
            {userState.loggedInUser?._id === userState.profileUser?._id ? <button className="profile-button" onClick={logout}>Logout</button> : <></>}

        </form>
    )
}

export default UpdateUserForm;