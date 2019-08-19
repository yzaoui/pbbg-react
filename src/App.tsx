import React from 'react';
import "normalize.css"
import "./common.css"
import './App.css';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import IndexPage from "./IndexPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import GuestNav from "./GuestNav";

const App: React.FC = () => {
    return <Router>
        <div className="container">
            <GuestNav />
            <nav>
                <ul>
                    <li><Link to="/">Index</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
            <Route path="/" exact component={IndexPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" exact component={LoginPage} />
        </div>
    </Router>;
};

export default App;
