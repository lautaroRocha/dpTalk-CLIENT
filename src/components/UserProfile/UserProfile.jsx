import React, {useContext} from 'react';
import "./userprofile.css"
import UserContext from '../../Context/UserContext';

const UserProfile = () => {

    const user = useContext(UserContext)

    return (
        <div className='profile'>
            {user &&
            <div className="profile-card">
                <div className="profile-head">
                    <span className="profile-picture"> </span>     
                    <h2>{user.username}</h2>   
                </div>
                <div className="profile-body">
                    <div className="questions">

                    </div>
                    <div className="answers">
                        
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default UserProfile;
