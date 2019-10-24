import axios from "axios";
import { ItemFilterState } from "../store";
import { CreateAuthorModel } from "../../../back-end/src/models";

class AuthorService {

    async getauthors(payload: ItemFilterState) {
        const serverResponse = await axios.post("http://localhost:80/authors", payload, { responseType: "json" });
        return serverResponse;
    }

    async createauthor (payload: CreateAuthorModel) {
        const authorS = localStorage.getItem('author');
        const author = authorS? JSON.parse(authorS): null;
        const adminToken = author? author.token: null;
        if(adminToken){
            try{
                const serverResponse = await axios.post("http://localhost:80/authors/add", payload, { responseType: "json",
                headers: {'Authorization': `Bearer ${adminToken}`}});
                return serverResponse.data;
            } catch(e){
                console.log('e', e);
            }
        }
    }
    async deleteauthor (id: string) {
        const authorS = localStorage.getItem('author');
        const author = authorS? JSON.parse(authorS): null;
        const adminToken = author? author.token: null;
        if(adminToken){
            try{
                const serverResponse = await axios.delete(`http://localhost:80/authors/${id}`, { responseType: "json",
                headers: {'Authorization': `Bearer ${adminToken}`}});
                return serverResponse.data;
            } catch(e){
                console.log('e', e);
            }
        }
    }
    async updateauthor (id: string, payload: CreateAuthorModel) {
        const authorS = localStorage.getItem('author');
        const author = authorS? JSON.parse(authorS): null;
        const adminToken = author? author.token: null;
        if(adminToken){
            try{
                const serverResponse = await axios.put(`http://localhost:80/authors/${id}`, payload, { responseType: "json",
                headers: {'Authorization': `Bearer ${adminToken}`}});
                return serverResponse.data;
            } catch(e){
                console.log('e', e);
            }
        }
    }
}

export const authorService = new AuthorService();