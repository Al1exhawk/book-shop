import axios, {AxiosResponse} from "axios";
import { ItemFilterState } from "../store";
import { CreateItemModel, ItemModel, UpdateItemModel, FilterModel } from "../models";

class ItemService {
    async getItems(payload: ItemFilterState) {
        const serverResponse = await axios.post<ItemFilterState, AxiosResponse<FilterModel<ItemModel>>>("http://localhost:80/items",
         payload, { responseType: "json" });
        return serverResponse.data;
    }

    async getBagItems(payload: Array<{id: string, amount: number}>) {
        const serverResponse = await axios.post<Array<{id: string, amount: number}>, AxiosResponse<{items: Array<{item: ItemModel, amount: number}>,totalPrice: number }>>("http://localhost:80/items/bag",
        payload,
        { responseType: "json" });
        return serverResponse.data;
    }

    async createItem (payload: CreateItemModel) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: 'null';

        const serverResponse = await axios.post<CreateItemModel,AxiosResponse<ItemModel>>("http://localhost:80/items/add", payload, { responseType: "json",
        headers: {'Authorization': `Bearer ${adminToken}`}});
        return serverResponse.data;
    }
    
    async deleteItem (id: string) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: 'null';
        if(adminToken){
            try{
                const serverResponse = await axios.delete<null, AxiosResponse<ItemModel>>(`http://localhost:80/items/${id}`, { responseType: "json",
                headers: {'Authorization': `Bearer ${adminToken}`}});
                return serverResponse.data;
            } catch(e){
                console.log('e', e);
            }
        }
    }
    async updateItem (id: string, payload: UpdateItemModel) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: 'null';
        
                const serverResponse = await axios.put<UpdateItemModel, AxiosResponse<ItemModel>>(`http://localhost:80/items/${id}`, payload, { responseType: "json",
                headers: {'Authorization': `Bearer ${adminToken}`}});
                return serverResponse.data;
           
        }
    
}

export const itemService = new ItemService();