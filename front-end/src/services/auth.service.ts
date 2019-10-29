import axios,{ AxiosResponse } from "axios";
import { RegistrationModel, LoginModel, LoginResponse, UserModel } from "../models";

class AuthService {    
     async logIn(payload: LoginModel) {
        const serverResponse = await axios.post<LoginModel, AxiosResponse<LoginResponse>>("http://localhost:80/login", payload, { responseType: "json" });
        return serverResponse;
     }
     
     async registration(payload: RegistrationModel) {
        await axios.post<RegistrationModel, AxiosResponse<UserModel>>('http://localhost:80/registration', payload);          
     } 
}

export const authService = new AuthService();