import React from "react";
import { Link, Route, RouteComponentProps } from "react-router-dom";
import "./DexPage.css";
import DexUnitsPage from "./DexUnitsPage";
import DexItemsPage from "./DexItemsPage";

const DexPage: React.FC<RouteComponentProps> = ({ match }) => <>
    <Route path={match.url + "/"} exact component={Index} />
    <Route path={match.url + "/items"} exact component={DexItemsPage} />
    <Route path={match.url + "/units"} exact component={DexUnitsPage} />
</>;

const Index: React.FC<RouteComponentProps> = ({ match }) =>
    <div className="dex-categories">
        <Link to={match.url + "/items"}>Items</Link>
        <Link to={match.url + "/units"}>Units</Link>
    </div>;

export default DexPage;
