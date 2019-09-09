import React from "react";
import { MarketItem } from "../../backend/market";
import { goldImg } from "../../helper/const";

interface Props {
    marketItem: MarketItem;
    onClick: (id: number) => void;
    selected: boolean;
    selectedQuantity?: number;
}

const MarketItemEntry: React.FC<Props> = ({ marketItem, onClick, selected, selectedQuantity }) => <li>
    <img
        src={marketItem.item.baseItem.img16}
        alt={marketItem.item.baseItem.friendlyName + " sprite"}
        onClick={() => onClick(marketItem.id)}
        tabIndex={0}
        data-selected={selected ? "" : undefined}
    />
    <div>
        {selectedQuantity !== undefined && selectedQuantity > 0 &&
            `${selectedQuantity}×`
        }
        {goldImg}
        <span>{marketItem.price}</span>
    </div>
</li>;

export default MarketItemEntry;
