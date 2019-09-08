import React from "react";
import { MarketItem } from "../../backend/market";
import goldSrc from "../../img/gold.png";
import LoadingButton from "../LoadingButton";

interface Props {
    items: MarketItem[];
    buying: boolean;
    onBuy: (ids: number[]) => void;
}

interface State {
    selectedItems: Set<number>;
}

class ForSale extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        selectedItems: new Set<number>()
    };

    render() {
        const { items, buying } = this.props;
        const { selectedItems } = this.state;

        return <div className="ForSale">
            <ul>
                {items.map(({ id, item, price }) => <li key={id}>
                    <img
                        src={item.baseItem.img16}
                        alt={item.baseItem.friendlyName + " sprite"}
                        onClick={() => this.handleClickItem(id)}
                        tabIndex={0}
                        data-selected={selectedItems.has(id) ? "" : undefined}
                    />
                    <div>
                        {goldImg}
                        <span>{price}</span>
                    </div>
                </li>)}
            </ul>
            <div className="footer">
                <span>Total: {goldImg}{this.total()}</span>
                <LoadingButton loading={buying} disabled={buying || selectedItems.size === 0} onClick={this.handleBuy}>Buy</LoadingButton>
            </div>
        </div>;
    }

    total = () => {
        return this.props.items.filter(item => this.state.selectedItems.has(item.id))
            .map(item => item.price)
            .reduce((total, price) => total + price, 0);
    };

    handleClickItem = (id: number) => {
        const currentItems = this.state.selectedItems;

        let newItems = new Set(currentItems);
        if (currentItems.has(id)) {
            newItems.delete(id);
        } else {
            newItems.add(id);
        }

        this.setState({ selectedItems: newItems });
    };

    handleBuy = () => {
        this.props.onBuy(Array.from(this.state.selectedItems));
    };
}

const goldImg = <img src={goldSrc} alt="Gold icon" style={{ width: "16px", height: "16px" }} />;

export default ForSale;
