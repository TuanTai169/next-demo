import { APIErrorResponse } from '@/types/api-err-response';
import { APIResponse } from '@/types/api-response';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Router from 'next/router';

export default class BaseHttpService {
  BASE_URL = process.env.BASE_URL || 'http://localhost:8000/api';
  accessToken: string = '';

  async get<T = any>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T | void> {
    Object.assign(options, this.getCommonOptions());
    return axios
      .get<APIResponse<T>>(`${this.BASE_URL}${endpoint}`, options)
      .then((res: AxiosResponse<APIResponse<T>>) => res.data.data)
      .catch((error: AxiosError<APIErrorResponse>) => this.handleHttpError(error));
  }

  async post<T = any>(
    endpoint: string,
    data: any = {},
    options: AxiosRequestConfig = {},
  ): Promise<T | void> {
    Object.assign(options, this.getCommonOptions());
    return axios
      .post<APIResponse<T>>(`${this.BASE_URL}${endpoint}`, data, options)
      .then((res: AxiosResponse<APIResponse<T>>) => res.data.data)
      .catch((error: AxiosError<APIErrorResponse>) => this.handleHttpError(error));
  }

  async delete<T = any>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T | void> {
    Object.assign(options, this.getCommonOptions());
    return axios
      .delete<APIResponse<T>>(`${this.BASE_URL}${endpoint}`, options)
      .then((res: AxiosResponse<APIResponse<T>>) => res.data.data)
      .catch((error: AxiosError<APIErrorResponse>) => this.handleHttpError(error));
  }

  async update<T = any>(
    endpoint: string,
    data: any = {},
    options: AxiosRequestConfig = {},
  ): Promise<T | void> {
    Object.assign(options, this.getCommonOptions());
    return axios
      .put<APIResponse<T>>(`${this.BASE_URL}${endpoint}`, data, options)
      .then((res: AxiosResponse<APIResponse<T>>) => res.data.data)
      .catch((error: AxiosError<APIErrorResponse>) => this.handleHttpError(error));
  }

  handleHttpError(error: AxiosError<APIErrorResponse>) {
    if (error?.response?.data) {
      const { statusCode } = error?.response?.data;

      const requestUrl = error.response?.config.url;

      if (
        statusCode !== 401 ||
        requestUrl?.endsWith('/auth/login') ||
        requestUrl?.endsWith('/auth/register')
      ) {
        throw error.response.data;
      } else {
        return this.handle401(error);
      }
    } else {
      throw error;
    }
  }

  handle401(error: AxiosError<APIErrorResponse>) {
    this.get('/auth/refresh')
      //   .then(() => axios.request(error.config))
      .catch((e) => Router.push('/login'));
  }

  getCommonOptions() {
    const token = this.loadToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  getAccessToken() {
    return this.accessToken ? this.accessToken : this.loadToken();
  }

  saveToken(accessToken: string) {
    this.accessToken = accessToken;
    return localStorage.setItem('accessToken', accessToken);
  }

  loadToken() {
    const token: string = localStorage.getItem('accessToken') as string;
    this.accessToken = token;
    return token;
  }

  removeToken() {
    localStorage.removeItem('accessToken');
  }
}
