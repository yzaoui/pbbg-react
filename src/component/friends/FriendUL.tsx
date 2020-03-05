import React from "react";
import { FriendInfo } from "../../backend/friends";
import FriendItem from "./FriendItem";
import { Link } from "react-router-dom";

interface Props {
    friendInfos: FriendInfo[];
}

const FriendUL: React.FC<Props> = ({ friendInfos }) => <ul className="FriendUL">
    {friendInfos.map(friend =>
        <li key={friend.userId}>
            <Link to={`/user/${friend.userId}`}>
                <FriendItem username={friend.username} />
            </Link>
        </li>
    )}
</ul>;

export default FriendUL;
