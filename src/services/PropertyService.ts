import {AxiosResponse} from "axios";
import {IProperty} from "../models/IProperty";
import $api from "../http";
import {AddPropertyRequest} from "../models/request/AddPropertyRequest";

export default class PropertyService {
    static async getPropertiesByOwnerId(ownerId : bigint) : Promise<AxiosResponse<IProperty[]>>  {
        return $api.get(`/properties?ownerId=${ownerId}`)
    }

    static async createProperty(request: AddPropertyRequest): Promise<AxiosResponse<String>> {
        return $api.post(`/properties/form`, request)
    }
}