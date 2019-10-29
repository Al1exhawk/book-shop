import axios, { AxiosResponse } from "axios";
import { ItemFilterState } from "../store";
import { CreateAuthorModel, FilterModel, AuthorModel, UpdateAuthorModel } from "../models";

class AuthorService {
    async getauthors(payload: ItemFilterState) {
        const serverResponse = await axios.post<ItemFilterState, AxiosResponse<FilterModel<AuthorModel>>>("http://localhost:80/authors", payload, { responseType: "json" });
        return serverResponse.data;
    }

    async createauthor (payload: CreateAuthorModel) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: 'null';

        const serverResponse = await axios.post<CreateAuthorModel, AxiosResponse<AuthorModel>>("http://localhost:80/authors/add",
        payload, { responseType: "json",
        headers: {'Authorization': `Bearer ${adminToken}`}});
        return serverResponse.data;
    }

    async deleteauthor (id: string) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: 'null';
        
        const serverResponse = await axios.delete<string, AxiosResponse<AuthorModel>>(`http://localhost:80/authors/${id}`, { 
        responseType: "json",
        headers: {'Authorization': `Bearer ${adminToken}`}});
        return serverResponse.data;
        }

    async updateauthor (id: string, payload: UpdateAuthorModel) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: 'null';
       
        const serverResponse = await axios.put<UpdateAuthorModel, AxiosResponse<AuthorModel>>(`http://localhost:80/authors/${id}`, payload, {
        responseType: "json",
        headers: {'Authorization': `Bearer ${adminToken}`}});
        return serverResponse.data;
          
    }
}

export const authorService = new AuthorService();