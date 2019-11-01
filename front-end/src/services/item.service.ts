import { AxiosResponse } from "axios";
import { ItemFilterState } from "../store";
import { CreateItemModel, ItemModel, UpdateItemModel, FilterModel, BagModel } from "../models";
import { BaseService } from "./base.service";

class ItemService extends BaseService {

    async getItems(payload: ItemFilterState) {    
        const serverResponse = await this.axiosInstance.post<ItemFilterState, AxiosResponse<FilterModel<ItemModel>>>("/items", payload);
        return serverResponse.data;
    }

    async getBagItems(payload: Array<{id: string, amount: number}>) {
        const serverResponse = await this.axiosInstance.post<Array<{id: string, amount: number}>, AxiosResponse<BagModel>>("/items/bag",payload);
        return serverResponse.data;
    }

    async createItem (payload: CreateItemModel) {
        const serverResponse = await this.axiosInstance.post<CreateItemModel,AxiosResponse<ItemModel>>("/items/add", payload);
        return serverResponse.data;
    }
    
    async deleteItem (id: string) {
        const serverResponse = await this.axiosInstance.delete<null, AxiosResponse<ItemModel>>(`/items/${id}`);
        return serverResponse.data;    
    }

    async updateItem (id: string, payload: UpdateItemModel) {        
        const serverResponse = await this.axiosInstance.put<UpdateItemModel, AxiosResponse<ItemModel>>(`/items/${id}`, payload);
        return serverResponse.data;
           
    }
    
}

export const itemService = new ItemService();