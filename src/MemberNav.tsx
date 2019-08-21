import React from "react";
import "./common.css";
import { NavLink } from "react-router-dom";
import authenticationService from "./authentication.service";

const MemberNav: React.FC = () => {
    return <nav className="sidebar">
        <div className="username">USERNAME</div>
        <div className="navigation">
            <NavLink to="/" className="sidebar-item" activeClassName="current-site-section">
                <span className="sidebar-item-icon" role="img" aria-label="Home">🏠</span>
                <span>Home</span>
            </NavLink>
        </div>
        <div className="sidebar-logout">
            <button onClick={handleLogoutClick}>Log out</button>
        </div>
    </nav>;
};

const handleLogoutClick = () => authenticationService.logout();

export default MemberNav;
