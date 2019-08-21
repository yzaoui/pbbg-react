import React from 'react';
import "normalize.css"
import "./common.css"
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import IndexPage from "./page/IndexPage";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import GuestNav from "./GuestNav";

const App: React.FC = () => {
    return <Router>
        <div className="container">
            <GuestNav />
            <main>
                <Route path="/" exact component={IndexPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" exact component={LoginPage} />
            </main>
        </div>
    </Router>;
};

export default App;
