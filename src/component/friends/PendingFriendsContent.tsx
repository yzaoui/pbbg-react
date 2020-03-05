import React from "react";
import { Friends } from "../../backend/friends";
import { Link } from "react-router-dom";

interface Props {
    friends: Friends;
}

const PendingFriendsContent: React.FC<Props> = ({ friends }) => {
    const receivedInvites = friends.friendInfos.filter(user => user.friendship === "request-received");
    const sentInvites = friends.friendInfos.filter(user => user.friendship === "request-sent");

    return <div className="PendingFriendsContent">
        <header>Received Invites</header>
        {receivedInvites.length > 0 ?
            <ul>{receivedInvites.map(user => <li key={user.userId}><Link to={`/user/${user.userId}`}>{user.username}</Link></li>)}</ul>
            :
            <i>You have no pending friend invites.</i>
        }
        <header>Sent Invites</header>
        {sentInvites.length > 0 ?
            <ul>{sentInvites.map(user => <li key={user.userId}><Link to={`/user/${user.userId}`}>{user.username}</Link></li>)}</ul>
            :
            <i>You have no pending sent invites.</i>
        }
    </div>;
};

export default PendingFriendsContent;
