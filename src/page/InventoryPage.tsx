import React from "react";
import player from "../img/player.png";
import "./InventoryPage.css";
import { Inventory, isEquippable } from "../backend/inventory";
import LoadingSpinner from "../component/LoadingSpinner";
import InventoryItem from "../component/inventory/InventoryItem";
import { Subscription } from "rxjs";
import inventoryService from "../backend/inventory.service";
import InventoryItemTooltip from "../component/inventory/InventoryItemTooltip";
import EquipmentSlot from "../component/inventory/EquipmentSlot";
import noPickaxe from "../img/no-pickaxe.png";
import { Howl } from "howler";
// @ts-ignore
import equipMP3 from "../audio/equip_effect.mp3";
// @ts-ignore
import equipOGG from "../audio/equip_effect.ogg";

interface State {
    state: "loading" | "error" | Inventory;
}

class InventoryPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;

    equipSound = new Howl({
        src: [equipMP3, equipOGG],
        preload: true
    });

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
                <EquipmentSlot item={this.state.state.equipment.pickaxe} style={{ top: "100px", left: "90px" }}>
                    <img src={noPickaxe} alt={"No pickaxe equipped"} />
                </EquipmentSlot>
            </div>
            <ul className="inventory-container">
                {this.state.state.items.map(({ id, item }) => <li key={id}>
                    <InventoryItem item={item} />
                    <InventoryItemTooltip
                        item={item}
                        equip={isEquippable(item) && !item.equipped ? () => this.handleEquipUnequip(id, "equip") : undefined}
                        unequip={isEquippable(item) && item.equipped ? () => this.handleEquipUnequip(id, "unequip") : undefined}
                    />
                </li>)}
            </ul>
        </>;
    }

    handleEquipUnequip = (inventoryItemId: number, action: "equip" | "unequip") => {
        this.request = inventoryService.equipUnequip(action, { inventoryItemId })
            .subscribe(
                res => {
                    this.equipSound.play();
                    this.setState({ state: res.data });
                },
                error => this.setState({ state: "error" })
            );
    }
}

export default InventoryPage;
