import React, { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import "./LoginRegisterPage.css";

const RegisterPage: React.FC = () => {
    return <>
        <form onSubmit={handleSubmit} className="LoginRegisterPage-form">
            <h1>Register your account</h1>
            <input type="text" required placeholder="Username" autoComplete="username" />
            <input type="password" required placeholder="Password" autoComplete="new-password" />
            <button type="submit">Register</button>
        </form>
        <Link to="/login" className="LoginRegisterPage-login-link">Existing user? Log in</Link>
    </>;
};

const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("submitted register form");
};

export default RegisterPage;
