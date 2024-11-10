import {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";
import $api from "../http";

export default class AuthService {


    static async getUserById(id: bigint): Promise<AxiosResponse<IUser>> {
        return $api.get("/users/" + id)

    }

    static async getUserByEmail(email: string): Promise<AxiosResponse<IUser>> {
        return $api.get("/users?email=" + email)

    }
    static fetchUsers() {
        
    }
}