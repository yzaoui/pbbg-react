import React from "react";
import banner from "../img/banner.png"
import { Link } from "react-router-dom";

const IndexPage: React.FC = () => {
    return <>
        <img src={banner} alt="Banner" style={{alignSelf: "center"}} />
        <Link to="/register" className="btn" style={{alignSelf: "center"}}>Register</Link>
        <br />
        <Link to="/login" className="btn" style={{alignSelf: "center"}}>Log in</Link>
    </>;
};

export default IndexPage;
