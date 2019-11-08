import { AxiosResponse } from "axios";
import { CreateAuthorModel, FilterModel, AuthorModel, UpdateAuthorModel, PagingModel } from 'models';
import { BaseService } from "./base.service";

class AuthorService extends BaseService {
    async getAuthors(payload: PagingModel) {
        const serverResponse = await this.axiosInstance.post<PagingModel, AxiosResponse<FilterModel<AuthorModel>>>("/authors", payload, { responseType: "json" });
        return serverResponse.data;
    }

    async createAuthor (payload: CreateAuthorModel) {
        const serverResponse = await this.axiosInstance.post<CreateAuthorModel, AxiosResponse<AuthorModel>>("/authors/add", payload);
        return serverResponse.data;
    }

    async deleteAuthor (id: string) {        
        const serverResponse = await this.axiosInstance.delete<string, AxiosResponse<AuthorModel>>(`/authors/${id}`);
        return serverResponse.data;
    }

    async updateAuthor (id: string, payload: UpdateAuthorModel) {       
        const serverResponse = await this.axiosInstance.put<UpdateAuthorModel, AxiosResponse<AuthorModel>>(`/authors/${id}`, payload);
        return serverResponse.data;          
    }
    
    async getAuthor(id: string) {
        const serverResponse = await this.axiosInstance.put<null, AxiosResponse<AuthorModel>>(`/authors/${id}`);
        return serverResponse.data; 
    }
}

export const authorService = new AuthorService();