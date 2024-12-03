import {IProperty} from "../IProperty";
import {IPropertyDetails} from "../IPropertyDetails";

export interface AddPropertyRequest {
    property: IProperty;
    propertyDetails: IPropertyDetails;
    images: string[];
}