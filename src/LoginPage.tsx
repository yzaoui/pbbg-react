import React, { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import "./LoginRegisterPage.css";

const LoginPage: React.FC = () => {
    return <>
        <form onSubmit={handleSubmit} className="LoginRegisterPage-form">
            <h1>Log in to PBBG</h1>
            <input type="text" required placeholder="Username" autoComplete="username" />
            <input type="password" required placeholder="Password" autoComplete="current-password" />
            <button type="submit">Log in</button>
        </form>
        <Link to="/register" className="LoginRegisterPage-login-link">New user? Register</Link>
    </>;
};

const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("submitted login form");
};

export default LoginPage;
