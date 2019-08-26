import authHeader from "../helper/auth-header";
import handleResponse from "../helper/handle-response";
import * as InventoryEndpoint from "../backend/inventory";
import * as RxJS from "rxjs";

const inventoryService = {
    getInventory: () => RxJS.from(
        fetch("/api/inventory", {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<InventoryEndpoint.InventoryResponse>(res)
        )
    ),
    equip: (inventoryItemId: number) => equipUnequip(inventoryItemId, "equip"),
    unequip: (inventoryItemId: number) => equipUnequip(inventoryItemId, "unequip")
};

const equipUnequip = (inventoryItemId: number, action: "equip" | "unequip") => RxJS.from(
    fetch("/api/inventory/equipment?action=" + action, {
        method: "POST",
        headers: authHeader()
    }).then(
        res => handleResponse<string>(res)
    )
);

export default inventoryService;
