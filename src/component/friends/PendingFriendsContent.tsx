import React from "react";
import { Friends } from "../../backend/friends";
import FriendsSectionHeader from "./FriendsSectionHeader";
import FriendUL from "./FriendUL";

interface Props {
    friends: Friends;
}

const PendingFriendsContent: React.FC<Props> = ({ friends }) => {
    const receivedInvites = friends.friendInfos.filter(user => user.friendship === "request-received");
    const sentInvites = friends.friendInfos.filter(user => user.friendship === "request-sent");

    return <div className="PendingFriendsContent">
        <FriendsSectionHeader>
            <span>RECEIVED INVITES</span>
        </FriendsSectionHeader>
        {receivedInvites.length > 0 ?
            <FriendUL friendInfos={receivedInvites} />
            :
            <div><i>You have no pending friend invites.</i></div>
        }
        <FriendsSectionHeader>
            <span>SENT INVITES</span>
        </FriendsSectionHeader>
        {sentInvites.length > 0 ?
            <FriendUL friendInfos={sentInvites} />
            :
            <div>
                <i>You have no pending sent invites.</i>
            </div>
        }
    </div>;
};

export default PendingFriendsContent;
