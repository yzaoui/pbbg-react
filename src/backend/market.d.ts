import { MaterializedItem } from "./inventory";

/**
 * /market
 */
export type MarketResponse = Market

/**
 * /market/inventory
 */
export type UserInventoryResponse = Market

export interface Market {
    items: MarketItem[];
}

interface MarketItem {
    id: number;
    item: MaterializedItem;
    price: number;
}
