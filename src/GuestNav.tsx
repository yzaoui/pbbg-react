import React, { FormEventHandler } from "react";
import "./common.css";
import { Link } from "react-router-dom";

const GuestNav: React.FC = () => {
    return <nav className="sidebar sidebar-guest">
        <Link to="/">Index</Link>
        <form className="sidebar-login-form" onSubmit={handleSubmit}>
            <input type="text" name="username" required placeholder="Username" />
            <input type="password" name="password" required placeholder="Password" />
            <button>Log in</button>
        </form>
    </nav>;
};

const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    console.log("submitted login form");
    event.preventDefault();
};

export default GuestNav;
