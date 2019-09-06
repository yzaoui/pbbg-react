/**
 * /market
 */
import { MaterializedItem } from "./inventory";

export type MarketResponse = Market

export interface Market {
    items: MarketItem[];
}

interface MarketItem {
    id: number;
    item: MaterializedItem;
    price: number;
}
