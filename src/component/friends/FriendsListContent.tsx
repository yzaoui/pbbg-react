import React from "react";
import { Friends } from "../../backend/friends";
import FriendsSectionHeader from "./FriendsSectionHeader";
import FriendUL from "./FriendUL";

interface Props {
    friends: Friends;
}

const FriendsListContent: React.FC<Props> = ({ friends }) => {
    const confirmedFriends = friends.friendInfos.filter(user => user.friendship === "confirmed");

    return <div className="FriendsListContent">
        <FriendsSectionHeader>
            <span>YOUR FRIENDS</span>
        </FriendsSectionHeader>
        {confirmedFriends.length > 0 ?
            <FriendUL friendInfos={confirmedFriends} />
        :
            <div><i>You have no friends.</i></div>
        }
    </div>;
};

export default FriendsListContent;
