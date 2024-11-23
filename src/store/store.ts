import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService"
import Cookies from "js-cookie";
import axios from "axios";
import {API_URL} from "../http";

export default class Store {
    isAuth = false
    isLoading = true

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            const user = await UserService.getUserByEmail(email)
            console.log(user)
            this.setAuth(true)

        }
        catch (e) {
            console.log(e)
        }
    }

    async register(email: string, password: string) {
        try {
            await AuthService.register(email, password)
        }
        catch (e) {
            console.log(e)
            return e
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            Cookies.remove('token')
            this.setAuth(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/users/1`, { withCredentials: true });
            if (response.status === 200) {
                console.log('set true')
                this.setAuth(true);
            } else {
                console.log('set false')
                this.setAuth(false);
            }
        } catch (e) {
            console.log(e);
        } finally {
            console.log('finally')
            this.setLoading(false);
        }
    }
}

