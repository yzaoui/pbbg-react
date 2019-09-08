import { MaterializedItem } from "./inventory";

/**
 * /market
 */
export type MarketResponse = Market

/**
 * /market/inventory
 */
export type UserInventoryResponse = Market

/**
 * /market/sell
 */
export type SellRequest = {
    orders: { id: number, quantity?: number }[];
}
export type SellResponse = Market

export interface Market {
    items: MarketItem[];
}

interface MarketItem {
    id: number;
    item: MaterializedItem;
    price: number;
}
