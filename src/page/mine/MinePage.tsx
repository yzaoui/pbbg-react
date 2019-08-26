import React from "react";
import { Route, RouteComponentProps } from "react-router";

interface State {

}

const MinePage: React.FC<RouteComponentProps> = ({ match }) => <>
    <Route path={match.url + "/"} exact component={Index} />
</>;

const Index: React.FC = () => <>Mine Page</>;

export default MinePage;
