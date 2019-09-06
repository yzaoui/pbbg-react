/**
 * /market
 */
import { MaterializedItem } from "./inventory";

export type MarketResponse = Market

export interface Market {
    items: MarketItem[];
}

interface MarketItem {
    item: MaterializedItem;
    price: number;
}
