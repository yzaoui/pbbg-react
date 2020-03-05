import React from "react";
import { Friends } from "../../backend/friends";
import { Link } from "react-router-dom";

interface Props {
    friends: Friends;
}

const FriendsListContent: React.FC<Props> = ({ friends }) => {
    const confirmedFriends = friends.friendInfos.filter(user => user.friendship === "confirmed");

    return <div className="FriendsListContent">
        {confirmedFriends.length > 0 ?
            <ul>{confirmedFriends.map(user => <li key={user.userId}><Link to={`/user/${user.userId}`}>{user.username}</Link></li>)}</ul>
        :
            <i>You have no friends.</i>
        }
    </div>;
};

export default FriendsListContent;
