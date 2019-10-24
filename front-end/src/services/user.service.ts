import axios from "axios";
import { ItemFilterState } from "../store";
import { CreateUserModel } from "../../../back-end/src/models";

class UserService {

    async getUsers(payload: ItemFilterState) {
        const serverResponse = await axios.post("http://localhost:80/users", payload, { responseType: "json" });
        return serverResponse;
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