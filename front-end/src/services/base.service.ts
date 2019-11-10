import axios, { AxiosInstance } from 'axios';
import { ConfigService } from './config.service';

export abstract class BaseService {
  protected axiosInstance: AxiosInstance;
  protected environmentService: ConfigService;
  constructor() {
    this.environmentService = new ConfigService();
    this.axiosInstance = axios.create({
      baseURL: this.environmentService.REACT_APP_API_ENDPOINT,
    });
    this.axiosInstance.interceptors.request.use(axiosRequestConfig => {
      const userS = localStorage.getItem('user');
      const user = userS ? JSON.parse(userS) : null;
      const adminToken = user ? user.token : 'null';
      axiosRequestConfig.headers = { Authorization: `Bearer ${adminToken}` };
      axiosRequestConfig.responseType = 'json';
      return axiosRequestConfig;
    });
  }
}
