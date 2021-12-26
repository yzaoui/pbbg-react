import React from "react";
import { NavLink } from "react-router-dom";
import authenticationService from "./../authentication.service";
import { Subscription } from "rxjs";
import userStatsService from "../backend/user-stats.service";
import LoadingSpinner from "./LoadingSpinner";

const navItems = [
    { to: "/", emoji: "🏠", label: "Home", exact: true },
    { to: "/squad", emoji: "👥", label: "Squad", exact: true },
    { to: "/inventory", emoji: "🎒", label: "Inventory", exact: true },
    { to: "/market", emoji: "💰", label: "Market", exact: true },
    { to: "/battle", emoji: "⚔️", label: "Battle", exact: true },
    { to: "/mine", emoji: "⛏️", label: "Mine", exact: false },
    { to: "/farm", emoji: "🌱", label: "Farm", exact: true },
    { to: "/dex", emoji: "📚", label: "Dex", exact: false },
    { to: "/friends", emoji: "🎉", label: "Friends", exact: false },
    { to: "/about", emoji: "❓", label: "About", exact: true },
    { to: "/settings", emoji: "⚙️", label: "Settings", exact: true }
];

interface LoadingState {
    status: "loading";
}

interface ErrorState {
    status: "error";
}

interface LoadedState {
    status: "loaded";
    username: string;
}

type State = LoadingState | ErrorState | LoadedState;

class MemberNav extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    request?: Subscription;

    componentDidMount(): void {
        this.request = userStatsService.get()
            .subscribe({
                next: value => this.setState({ status: "loaded", username: value.data.username }),
                error: err => this.setState({ status: "error" })
            });
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
                <button className="fancy" onClick={handleLogoutClick}>Log out</button>
            </div>
        </nav>;
    }

    renderUsername = () => {
        if (this.state.status === "loading") return <LoadingSpinner />;
        else if (this.state.status === "error") return <i>ERROR</i>;

        return this.state.username;
    };
}

const handleLogoutClick = () => authenticationService.logout();

export default MemberNav;
