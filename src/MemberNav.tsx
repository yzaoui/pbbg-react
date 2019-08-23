import React from "react";
import "./common.css";
import { NavLink } from "react-router-dom";
import authenticationService from "./authentication.service";

const navItems = [
    { to: "/", emoji: "🏠", label: "Home", exact: true},
    { to: "/dex", emoji: "📚", label: "Dex", exact: false}
];

const MemberNav: React.FC = () => {
    return <nav className="sidebar">
        <div className="username">USERNAME</div>
        <div className="navigation">
            {navItems.map(({ to, emoji, label, exact }) =>
                <NavLink key={to} to={to} exact={exact} className="sidebar-item" activeClassName="current-site-section">
                    <span className="sidebar-item-icon" role="img" aria-label="Home">{emoji}</span>
                    <span>{label}</span>
                </NavLink>
            )}
        </div>
        <div className="sidebar-logout">
            <button onClick={handleLogoutClick}>Log out</button>
        </div>
    </nav>;
};

const handleLogoutClick = () => authenticationService.logout();

export default MemberNav;
