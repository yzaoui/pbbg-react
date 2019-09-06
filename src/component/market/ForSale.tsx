import React from "react";
import { Market } from "../../backend/market";
import goldSrc from "../../img/gold.png";
import LoadingButton from "../LoadingButton";

const ForSale: React.FC<Market> = ({ items }) => <div className="ForSale">
    <ul>
        {items.map(({ id, item, price }) => <li key={id}>
            <img src={item.baseItem.img16} alt={item.baseItem.friendlyName + " sprite"} />
            <div>
                {goldImg}
                <span>{price}</span>
            </div>
        </li>)}
    </ul>
    <div className="footer">
        <span>Total: {goldImg}0</span>
        <LoadingButton loading={false} disabled={true}>Buy</LoadingButton>
    </div>
</div>;

const goldImg = <img src={goldSrc} alt="Gold icon" style={{ width: "16px", height: "16px" }} />;

export default ForSale;
