import "./ProfilePage.css"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/ReduxStore";
import { useEffect } from "react";
import { fetchUser } from "../../redux/slices/AuthSlice";
import { UpdateUserForm } from "../../features/profile";
import ProfileLoanHistory from "../../features/profile/components/ProfileLoanHistory/ProfileLoanHistory";

const ProfilePage:React.FC = () => {

    const {profileUser} = useSelector((state:RootState) => state.auth);
    const {userId} = useParams();

    const dispatch:AppDispatch = useDispatch();

    useEffect(() =>{
        if(userId){
            console.log('dispatching profile ', userId);
                dispatch(fetchUser({
                    userId, property:'profileUser'
                }));
        }
    }, [userId]);
    
    return(
        <div className="page">
            <div className="page-container">
                <h1 className="text-center text-2xl mb-2 bg-green-200 rounded-full w-full">{profileUser && `${profileUser.firstName}'s Profile`}</h1>
                {
                    profileUser && 
                    <div className="profile-page-cols">
                    <div className="profile-page-left-column">
                        <UpdateUserForm />
                    </div>
                    <div className="profile-page-right-column">
                        {
                            profileUser && <ProfileLoanHistory />
                        }
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default ProfilePage;