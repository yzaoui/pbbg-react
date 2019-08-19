import React, { FormEventHandler } from "react";
import "./common.css";
import "./GuestNav.css";
import { Link } from "react-router-dom";

const GuestNav: React.FC = () => {
    return <nav className="sidebar sidebar-guest">
        <Link to="/">Index</Link>
        <form className="sidebar-login-form" onSubmit={handleSubmit}>
            <input type="text" name="username" required placeholder="Username" autoComplete="username" />
            <input type="password" name="password" required placeholder="Password" autoComplete="current-password" />
            <button>Log in</button>
        </form>
    </nav>;
};

const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("submitted login form");
};

export default GuestNav;
