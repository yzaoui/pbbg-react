import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import "./DexPage.css";

const DexPage: React.FC<RouteComponentProps> = ({ match }) =>
    <div className="dex-categories">
        <Link to={match.url + "/items"}>Items</Link>
        <Link to={match.url + "/units"}>Units</Link>
    </div>;

export default DexPage;
