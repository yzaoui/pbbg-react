import React from "react";
import { UserProfile } from "../backend/user";

interface Props {
    userProfile: UserProfile;
}

const UserProfileComponent: React.FC<Props> = ({ userProfile: { username, friendship } }) => <div>
    <div><b>{username}</b></div>
    {friendship === "none" ?
        <>
            <span>You are not friends.</span>
            <button>Add Friend</button>
        </>
    : friendship === "request-sent" ?
        <>
            <span>Friend request sent.</span>
            <button>Cancel Friend Request</button>
        </>
    : friendship === "request-received" ?
        <>
            <span>Friend request received.</span>
            <button>Accept Friend Request</button>
        </>
    : friendship === "confirmed" ?
        <>
            <span>You are friends.</span>
            <button>Unfriend</button>
        </>
    : <></>}
</div>;

export default UserProfileComponent;
