import axios, {AxiosInstance} from 'axios';

export abstract class BaseService {
    protected axiosInstance: AxiosInstance;

    constructor(){
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:80',
        });
        this.axiosInstance.interceptors.request.use((axiosRequestConfig)=>{
            const userS = localStorage.getItem('user');
            const user = userS? JSON.parse(userS): null;
            const adminToken = user? user.token: 'null';
            axiosRequestConfig.headers = {'Authorization': `Bearer ${adminToken}`};
            axiosRequestConfig.responseType='json';
            return axiosRequestConfig;
        })
    }
}