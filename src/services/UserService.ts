import {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";
import $api from "../http";

export default class UserService {


    static async getUserById(id: bigint): Promise<AxiosResponse<IUser>> {
        return $api.get("/users/" + id)

    }

    static async getUserByEmail(email: string): Promise<AxiosResponse<IUser>> {
        return $api.get("/users?email=" + email)

    }

    static async createUserByToken(): Promise<AxiosResponse<IUser>> {
        return $api.post("/users", {})
    }

    static async updateUser(user : IUser): Promise<AxiosResponse<IUser>> {
        return $api.patch("/users", user)
    }
    static fetchUsers() {
        
    }
}