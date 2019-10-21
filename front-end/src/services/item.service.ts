import axios,{ AxiosPromise } from "axios";
import { FilterForm } from "../constants/types";

export class ItemService {
    async getItems(payload: FilterForm) {
        const serverResponse = await axios.post<FilterForm, AxiosPromise>("http://localhost:80/items", payload, { responseType: "json" });
        return serverResponse;
    }

}