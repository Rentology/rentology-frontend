import {AxiosResponse} from "axios";
import {IProperty} from "../models/IProperty";
import $api from "../http";

export default class PropertyService {
    static async getPropertiesByOwnerId(ownerId : bigint) : Promise<AxiosResponse<IProperty[]>>  {
        return $api.get(`/properties?ownerId=${ownerId}`)
    }
}