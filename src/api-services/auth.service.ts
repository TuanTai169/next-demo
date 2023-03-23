import { User } from '@/types/user';
import axios from 'axios';
import BaseHttpService from './base-http.service';

export const login = async (data: any) => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/login', data);
    if (!!response && !!response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (data: any) => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/register', data);
    if (!!response && !!response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default class AuthService extends BaseHttpService {
  async login(loginDto: any): Promise<User> {
    return (await this.post<User>('/auth/login', loginDto)) as User;
  }
}
