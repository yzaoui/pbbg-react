import React from "react";
import { Route, RouteComponentProps } from "react-router";
import IndexPage from "./IndexPage";

const MinePage: React.FC<RouteComponentProps> = ({ match }) => <>
    <Route path={match.url + "/"} exact component={IndexPage} />
</>;

export default MinePage;
