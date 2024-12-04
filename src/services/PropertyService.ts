import {AxiosResponse} from "axios";
import {IProperty} from "../models/IProperty";
import $api from "../http";
import {AddPropertyRequest} from "../models/request/AddPropertyRequest";
import {IPropertyDetails} from "../models/IPropertyDetails";

export default class PropertyService {
    static async getPropertiesByOwnerId(ownerId : bigint) : Promise<AxiosResponse<IProperty[]>>  {
        return $api.get(`/properties?ownerId=${ownerId}`)
    }

    static async createProperty(request : AddPropertyRequest): Promise<AxiosResponse<String>> {
        return $api.post(`/properties/form`, request)
    }

    static async deleteProperty(id : BigInt) : Promise<AxiosResponse<string>> {
        return $api.delete(`/properties/form/${id}`)
    }

    static async getPropertyById(id : bigint) : Promise<AxiosResponse<IProperty>> {
        return $api.get(`/properties?id=${id}`)
    }

    static async getPropertyDetailsById(id : bigint) : Promise<AxiosResponse<IPropertyDetails>> {
        return $api.get(`/prop-details/${id}`)
    }

    static async getAllProperties() : Promise<AxiosResponse<IProperty[]>> {
        return $api.get(`/properties`)
    }
}