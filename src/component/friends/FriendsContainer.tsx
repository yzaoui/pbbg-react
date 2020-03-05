import React from "react";
import FriendsNav from "./FriendsNav";
import FriendsContent from "./FriendsContent";
import { Friends } from "../../backend/friends";
import { match } from "react-router-dom";

interface Props {
    match: match;
    friends: Friends;
}

const FriendsContainer: React.FC<Props> = ({ match, friends }) => <div className="FriendsContainer">
    <FriendsNav match={match} />
    <FriendsContent match={match} friends={friends} />
</div>;

export default FriendsContainer;
