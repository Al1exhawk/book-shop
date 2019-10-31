import { AxiosResponse } from "axios";
import { ItemFilterState } from "../store";
import { CreateAuthorModel, FilterModel, AuthorModel, UpdateAuthorModel } from "../models";
import { BaseService } from "./base.service";

class AuthorService extends BaseService {
    async getauthors(payload: ItemFilterState) {
        const serverResponse = await this.axiosInstance.post<ItemFilterState, AxiosResponse<FilterModel<AuthorModel>>>("/authors", payload, { responseType: "json" });
        return serverResponse.data;
    }

    async createauthor (payload: CreateAuthorModel) {
        const serverResponse = await this.axiosInstance.post<CreateAuthorModel, AxiosResponse<AuthorModel>>("/authors/add", payload);
        return serverResponse.data;
    }

    async deleteauthor (id: string) {        
        const serverResponse = await this.axiosInstance.delete<string, AxiosResponse<AuthorModel>>(`/authors/${id}`);
        return serverResponse.data;
    }

    async updateauthor (id: string, payload: UpdateAuthorModel) {       
        const serverResponse = await this.axiosInstance.put<UpdateAuthorModel, AxiosResponse<AuthorModel>>(`/authors/${id}`, payload);
        return serverResponse.data;          
    }
}

export const authorService = new AuthorService();