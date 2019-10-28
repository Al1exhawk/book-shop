import axios from "axios";
import { ItemFilterState } from "../store";
import { CreateItemModel } from "../../../back-end/src/models";

class ItemService {
    async getItems(payload: ItemFilterState) {
        const serverResponse = await axios.post("http://localhost:80/items", payload, { responseType: "json" });
        return serverResponse;
    }

    async getBagItems(payload: Array<{id: string, amount: number}>) {
        const serverResponse = await axios.post("http://localhost:80/items/bag", payload, { responseType: "json" });
        return serverResponse.data;
    }

    async createItem (payload: CreateItemModel) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: null;
        
            try{
                const serverResponse = await axios.post("http://localhost:80/items/add", payload, { responseType: "json",
                headers: {'Authorization': `Bearer ${adminToken}`}});
                return serverResponse.data;
            } catch(e){
                console.log('e', e);
            }
        
    }
    
    async deleteItem (id: string) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: null;
        if(adminToken){
            try{
                const serverResponse = await axios.delete(`http://localhost:80/items/${id}`, { responseType: "json",
                headers: {'Authorization': `Bearer ${adminToken}`}});
                return serverResponse.data;
            } catch(e){
                console.log('e', e);
            }
        }
    }
    async updateItem (id: string, payload: CreateItemModel) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: null;
        if(adminToken){
            try{
                const serverResponse = await axios.put(`http://localhost:80/items/${id}`, payload, { responseType: "json",
                headers: {'Authorization': `Bearer ${adminToken}`}});
                return serverResponse.data;
            } catch(e){
                console.log('e', e);
            }
        }
    }
}

export const itemService = new ItemService();