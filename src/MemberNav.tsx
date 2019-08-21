import React from "react";
import "./common.css";
import { NavLink } from "react-router-dom";

const MemberNav: React.FC = () => {
    return <nav className="sidebar">
        <div className="username">USERNAME</div>
        <div className="navigation">
            <NavLink to="/" className="sidebar-item" activeClassName="current-site-section">
                <span className="sidebar-item-icon" role="img" aria-label="Home">🏠</span>
                <span>Home</span>
            </NavLink>
        </div>
    </nav>;
};

export default MemberNav;
