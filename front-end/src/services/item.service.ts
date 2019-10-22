import axios,{ AxiosPromise } from "axios";
import { ItemFilterState } from "../store";

class ItemService {
    async getItems(payload: ItemFilterState) {
        const serverResponse = await axios.post<ItemFilterState, AxiosPromise>("http://localhost:80/items", payload, { responseType: "json" });
        return serverResponse;
    }

    async getBagItems(payload: Array<{id: string, amount: number}>) {
        const serverResponse = await axios.post("http://localhost:80/items/bag", payload, { responseType: "json" });
        return serverResponse.data;
    }
}

export const itemService = new ItemService();