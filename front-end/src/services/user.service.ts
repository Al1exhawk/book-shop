import axios from "axios";
import { PagingModel, CreateUserModel } from '../../../back-end/src/models';


class UserService {

    async getUsers(payload: PagingModel) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: null;
        if(adminToken){
            try{
                const serverResponse = await axios.post("http://localhost:80/users", payload,
                 { responseType: "json",
                 headers: {'Authorization': `Bearer ${adminToken}`}});

                console.log('serverResponse', serverResponse.data);

                return serverResponse.data;
            } 
            catch(e){
                console.log('object');
                console.log('e', e);
            }
        }
    }

    async createUser (payload: CreateUserModel) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: null;
        if(adminToken){
            try{
                const serverResponse = await axios.post("http://localhost:80/users/add", payload, { responseType: "json",
                headers: {'Authorization': `Bearer ${adminToken}`}});
                return serverResponse.data;
            } catch(e){
                console.log('e', e);
            }
        }
    }
    async deleteUser (id: string) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: null;
        if(adminToken){
            try{
                const serverResponse = await axios.delete(`http://localhost:80/users/${id}`, { responseType: "json",
                headers: {'Authorization': `Bearer ${adminToken}`}});
                return serverResponse.data;
            } catch(e){
                console.log('e', e);
            }
        }
    }
    async updateUser (id: string, payload: CreateUserModel) {
        const userS = localStorage.getItem('user');
        const user = userS? JSON.parse(userS): null;
        const adminToken = user? user.token: null;
        if(adminToken){
            try{
                const serverResponse = await axios.put(`http://localhost:80/users/${id}`, payload, { responseType: "json",
                headers: {'Authorization': `Bearer ${adminToken}`}});
                return serverResponse.data;
            } catch(e){
                console.log('e', e);
            }
        }
    }
}

export const userService = new UserService();