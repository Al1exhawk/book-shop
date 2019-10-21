import axios,{ AxiosPromise } from "axios";
import { ItemFilterState } from "../store";

export class ItemService {
    async getItems(payload: ItemFilterState) {
        const serverResponse = await axios.post<ItemFilterState, AxiosPromise>("http://localhost:80/items", payload, { responseType: "json" });
        return serverResponse;
    }
}