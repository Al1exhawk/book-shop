import axios,{ AxiosPromise } from "axios";
import { RegistrationModel, LoginModel } from "../../../back-end/src/models";

class AuthService {    
     async logIn(payload: LoginModel) {
        const serverResponse = await axios.post<LoginModel, AxiosPromise>("http://localhost:80/login", payload, { responseType: "json" });
        return serverResponse;
     }
     
     async registration(payload: RegistrationModel) {
        await axios.post<RegistrationModel, AxiosPromise>('http://localhost:80/registration', payload);          
     } 
}

export const authService = new AuthService();