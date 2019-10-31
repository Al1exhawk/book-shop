import { AxiosResponse } from "axios";
import { RegistrationModel, LoginModel, LoginResponse, UserModel } from "../models";
import { BaseService } from "./base.service";

class AuthService extends BaseService {   
     async logIn(payload: LoginModel) {
        const serverResponse = await this.axiosInstance.post<LoginModel, AxiosResponse<LoginResponse>>("/login", payload);
        return serverResponse;
     }
     
     async registration(payload: RegistrationModel) {
        await this.axiosInstance.post<RegistrationModel, AxiosResponse<UserModel>>('/registration', payload);          
     } 
}

export const authService = new AuthService();