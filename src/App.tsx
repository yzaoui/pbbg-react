import React from 'react';
import "normalize.css"
import "./common.scss"
import { Route, Router, Switch, Redirect } from "react-router-dom";
import GuestNav from "./component/GuestNav";
import MemberNav from "./component/MemberNav";
import GuestRoute from "./GuestRoute";
import MemberRoute from "./MemberRoute";
import IndexGuestPage from "./page/IndexGuestPage";
import IndexMemberPage from "./page/IndexMemberPage";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import SquadPage from "./page/SquadPage";
import MinePage from "./page/mine/MinePage";
import FarmPage from "./page/FarmPage";
import InventoryPage from "./page/InventoryPage";
import ItemPage from "./page/ItemPage";
import DexPage from "./page/dex/DexPage";
import SettingsPage from "./page/SettingsPage";
import authenticationService from "./authentication.service";
import history from "./helper/history";
import BattlePage from "./page/BattlePage";
import MarketPage from "./page/MarketPage";

interface State {
    currentUserToken: string | null;
}

class App extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        currentUserToken: null
    };

    componentDidMount() {
        authenticationService.currentUser.subscribe(token => this.setState({ currentUserToken: token }));
    }

    render () {
        const isLoggedIn = this.state.currentUserToken !== null;

        return <Router history={history}>
            <div className="container">
                {isLoggedIn ? <MemberNav /> : <GuestNav />}
                <main className="pbbg-main">
                    <Switch>
                        <Route path="/" exact render={() => isLoggedIn ? <IndexMemberPage /> : <IndexGuestPage />} />
                        <GuestRoute path="/register" component={RegisterPage} />
                        <GuestRoute path="/login" component={LoginPage} />
                        <MemberRoute path="/squad" component={SquadPage} />
                        <MemberRoute path="/inventory" component={InventoryPage} />
                        <Route path="/item/:id" exact component={ItemPage} />
                        <MemberRoute path="/market" component={MarketPage} />
                        <MemberRoute path="/battle" component={BattlePage} />
                        <MemberRoute path="/mine" component={MinePage} />
                        <MemberRoute path="/farm" component={FarmPage} />
                        <MemberRoute path="/dex" component={DexPage} />
                        <MemberRoute path="/settings" component={SettingsPage} />
                        <Redirect to="/" />
                    </Switch>
                </main>
            </div>
        </Router>;
    }
}

export default App;
