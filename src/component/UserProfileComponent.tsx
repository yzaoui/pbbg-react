import React from "react";
import { UserProfile } from "../backend/user";

interface Props {
    userProfile: UserProfile;
}

const UserProfileComponent: React.FC<Props> = ({ userProfile }) => <div>
    <div><b>{userProfile.username}</b></div>
    {userProfile.friends !== null ? (
        userProfile.friends ? <>
            <span>You are friends</span>
            <button>Unfriend</button>
        </> : <>
            <span>You are not friends.</span>
            <button>Add friend</button>
    </>) : undefined}
</div>;

export default UserProfileComponent;
