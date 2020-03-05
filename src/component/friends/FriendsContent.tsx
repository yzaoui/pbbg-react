import React from "react";
import { Route, match } from "react-router-dom";
import { Friends } from "../../backend/friends";
import FriendsListContent from "./FriendsListContent";
import AddFriendsContent from "./AddFriendsContent";
import PendingFriendsContent from "./PendingFriendsContent";

interface Props {
    match: match;
    friends: Friends;
}

const FriendsContent: React.FC<Props> = ({ match, friends }) => <div className="FriendsContent">
    <Route path={`${match.path}/`} exact>
        <FriendsListContent friends={friends} />
    </Route>
    <Route path={`${match.path}/add`} exact>
        <AddFriendsContent />
    </Route>
    <Route path={`${match.path}/pending`} exact>
        <PendingFriendsContent friends={friends} />
    </Route>
</div>;

export default FriendsContent;
