import axios, { AxiosResponse } from "axios";
import { PagingModel, CreateUserModel, UpdateUserModel, UserModel, FilterModel } from '../models';


class UserService {

    async getUsers(payload: PagingModel) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: 'null';       
        
        const serverResponse = await axios.post<PagingModel,AxiosResponse<FilterModel<UserModel>>>("http://localhost:80/users", payload,
        { responseType: "json",
        headers: {'Authorization': `Bearer ${adminToken}`}});


        return serverResponse.data;
        
    }

    async getUser(id: string) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: 'null';       
        
        const serverResponse = await axios.get<null,AxiosResponse<UserModel>>(`http://localhost:80/users/${id}`,
        { responseType: "json",
        headers: {'Authorization': `Bearer ${adminToken}`}});


        return serverResponse.data;
    }

    async createUser (payload: CreateUserModel) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: 'null';
      
            
        const serverResponse = await axios.post<CreateUserModel, AxiosResponse<UserModel>>("http://localhost:80/users/add", payload, { responseType: "json",
        headers: {'Authorization': `Bearer ${adminToken}`}});
        return serverResponse.data;
 
    }

    async deleteUser (id: string) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: 'null';
       
          
        const serverResponse = await axios.delete<null, AxiosResponse<UserModel>>(`http://localhost:80/users/${id}`, { responseType: "json",
        headers: {'Authorization': `Bearer ${adminToken}`}});
        return serverResponse.data;
        
    }
    async updateUser (id: string, payload: UpdateUserModel) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: 'null';        
         
        const serverResponse = await axios.put<UpdateUserModel, AxiosResponse<UserModel>>(`http://localhost:80/users/${id}`, payload, { responseType: "json",
        headers: {'Authorization': `Bearer ${adminToken}`}});
        return serverResponse.data;
    
    }
}

export const userService = new UserService();