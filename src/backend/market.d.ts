import { MaterializedItem } from "./inventory";

/**
 * /market
 */
export type MarketResponse = UserAndGameMarkets

/**
 * /market/buy
 */
export type BuyRequest = {
    orders: { id: number, quantity?: number }[];
}
export type BuyResponse = UserAndGameMarkets

/**
 * /market/sell
 */
export type SellRequest = {
    orders: { id: number, quantity?: number }[];
}
export type SellResponse = UserAndGameMarkets

export interface UserAndGameMarkets {
    userMarket: Market;
    gameMarket: Market;
}

export interface Market {
    items: MarketItem[];
}

interface MarketItem {
    id: number;
    item: MaterializedItem;
    price: number;
}
