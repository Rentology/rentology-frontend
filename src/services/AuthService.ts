import $api from "../http";
import {LoginResponse} from "../models/response/LoginResponse";
import {AxiosResponse} from 'axios';
import {RegisterResponse} from "../models/response/RegisterResponse";
import {IsAdminResponse} from "../models/response/IsAdminResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        return $api.post<LoginResponse>('/auth/login', {email, password, app_id: 1})
    }

    static async register(email: string, password: string): Promise<AxiosResponse<RegisterResponse>> {
        return $api.post<RegisterResponse>('/auth/register', {email, password})
    }

    static async isAdmin(id: bigint): Promise<AxiosResponse<IsAdminResponse>> {
        return $api.post<IsAdminResponse>(`/auth/isadmin/${id}`, {user_id: id})
    }

    static async logout(): Promise<void> {
        return $api.delete("/auth/logout")
    }

}