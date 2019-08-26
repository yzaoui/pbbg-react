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
    equipUnequip: (action: "equip" | "unequip", req: InventoryEndpoint.EquipUnequipRequest) => RxJS.from(
        fetch(`/api/inventory/equipment?action=${action}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...authHeader() },
            body: JSON.stringify(req)
        }).then(
            res => handleResponse<InventoryEndpoint.InventoryResponse>(res)
        )
    )
};

export default inventoryService;
