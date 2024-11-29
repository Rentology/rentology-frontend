import {AxiosResponse} from "axios";
import {Image} from "../models/Image";
import $api from "../http";

export default class ImageService {
    static async getImageByPropertyId(id: bigint): Promise<AxiosResponse<Image[]>> {
        return $api.get("/images?propertyId=" + id)
    }

    static async getImageById(id: bigint): Promise<Blob> {
        const response: AxiosResponse = await $api.get(`/images/${id}`, {
            responseType: "blob"
        })
        return response.data
    }
}