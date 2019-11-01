import { AxiosResponse } from "axios";
import { PagingModel, CreateUserModel, UpdateUserModel, UserModel, FilterModel } from '../models';
import { BaseService } from "./base.service";


class UserService extends BaseService{

    async getUsers(payload: PagingModel) {
        const serverResponse = await this.axiosInstance.post<PagingModel,AxiosResponse<FilterModel<UserModel>>>("/users", payload);
        return serverResponse.data;        
    }

    async getUser(id: string) {
        const serverResponse = await this.axiosInstance.get<null,AxiosResponse<UserModel>>(`/users/${id}`);
        return serverResponse.data;
    }

    async createUser (payload: CreateUserModel) {       
        const serverResponse = await this.axiosInstance.post<CreateUserModel, AxiosResponse<UserModel>>("/users/add", payload);
        return serverResponse.data; 
    }

    async deleteUser (id: string) {      
        const serverResponse = await this.axiosInstance.delete<null, AxiosResponse<UserModel>>(`/users/${id}`);
        return serverResponse.data;        
    }

    async updateUser (id: string, payload: UpdateUserModel) { 
            const serverResponse = await this.axiosInstance.put<UpdateUserModel, AxiosResponse<UserModel>>(`/users/${id}`, payload);
            return serverResponse.data;
    }
}

export const userService = new UserService();