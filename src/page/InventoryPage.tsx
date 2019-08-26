import React from "react";
import player from "../img/player.png";
import "./InventoryPage.css";
import { Inventory } from "../backend/inventory";
import LoadingSpinner from "../component/LoadingSpinner";
import InventoryItem from "../component/inventory/InventoryItem";
import { Subscription } from "rxjs";
import inventoryService from "../backend/inventory.service";

interface State {
    state: "loading" | "error" | Inventory;
}

class InventoryPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        this.request = inventoryService.getInventory()
            .subscribe(
                res => this.setState({ state: res.data }),
                error => this.setState({ state: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        if (this.state.state === "error") return "ERROR";
        else if (this.state.state === "loading") return <LoadingSpinner />;

        return <>
            <div className="player-equipment">
                <img className="player-portrait" src={player} alt="Player portrait" />
            </div>
            <ul className="inventory-container">
                {this.state.state.items.map(({ id, item }) => <li key={id}>
                    <InventoryItem item={item} />
                </li>)}
            </ul>
        </>;
    }
}

export default InventoryPage;
