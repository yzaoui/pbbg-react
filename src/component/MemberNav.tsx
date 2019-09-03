import React from "react";
import "../common.css";
import { NavLink } from "react-router-dom";
import authenticationService from "./../authentication.service";
import { Subscription } from "rxjs";
import userService from "./../backend/user.service";
import LoadingSpinner from "./LoadingSpinner";

const navItems = [
    { to: "/", emoji: "🏠", label: "Home", exact: true },
    { to: "/squad", emoji: "👥", label: "Squad", exact: true },
    { to: "/inventory", emoji: "🎒", label: "Inventory", exact: true },
    { to: "/battle", emoji: "⚔️", label: "Battle", exact: true },
    { to: "/mine", emoji: "⛏️", label: "Mine", exact: false },
    { to: "/dex", emoji: "📚", label: "Dex", exact: false },
    { to: "/settings", emoji: "⚙️", label: "Settings", exact: true }
];

interface State {
    state: "loading" | "error" | { username: string }
}

class MemberNav extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;

    componentDidMount(): void {
        this.request = userService.get()
            .subscribe(
                res => this.setState({ state: { username: res.data.username } }),
                error => this.setState({ state: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        return <nav className="sidebar">
            <div className="username">{this.renderUsername()}</div>
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
    }

    renderUsername = () => {
        if (this.state.state === "loading") return <LoadingSpinner />;
        else if (this.state.state === "error") return <i>ERROR</i>;

        return this.state.state.username;
    };
}

const handleLogoutClick = () => authenticationService.logout();

export default MemberNav;
