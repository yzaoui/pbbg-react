import React from "react";
import { Market } from "../../backend/market";
import goldSrc from "../../img/gold.png";

const ForSale: React.FC<Market> = ({ items }) => <div className="ForSale">
    <ul>
        {items.map(({ id, item, price }) => <li key={id}>
            <img src={item.baseItem.img16} alt={item.baseItem.friendlyName + " sprite"} />
            <div>
                <img src={goldSrc} alt="Gold icon" style={{ width: "16px", height: "16px" }} />
                <span>{price}</span>
            </div>
        </li>)}
    </ul>
    <div className="footer">
        <span>Total:</span>
    </div>
</div>;

export default ForSale;
