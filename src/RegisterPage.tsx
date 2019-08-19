import React from "react";
import { Link } from "react-router-dom";
import "./LoginRegisterPage.css";
import RegisterForm from "./RegisterForm";

const RegisterPage: React.FC = () => {
    return <>
        <RegisterForm onSubmit={handleSubmit} />
        <Link to="/login" className="LoginRegisterPage-login-link">Existing user? Log in</Link>
    </>;
};

const handleSubmit = (username: string, password: string) => {
    console.log(`submitted register form. username: ${username}, password: ${password}`);
};

export default RegisterPage;
