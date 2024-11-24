import React from "react";
import styles from "./Property.module.css";

export interface Property {
    id: number;
    ownerId: number;
    title: string;
    location: string;
    price: number;
    propertyType: "house" | "apartment";
    rentalType: "shortTerm" | "longTerm";
    maxGuests: number;
    createdAt: string;
}

interface PropertyProps {
    property: Property;
}

const Property: React.FC<PropertyProps> = ({ property }) => {
    return (
        <div className={styles.property}>
            <h2>{property.title}</h2>
            <p>
                <strong>Location:</strong> {property.location}
            </p>
            <p>
                <strong>Price:</strong> ${property.price}
            </p>
            <p>
                <strong>Type:</strong> {property.propertyType}
            </p>
            <p>
                <strong>Rental Type:</strong> {property.rentalType}
            </p>
            <p>
                <strong>Max Guests:</strong> {property.maxGuests}
            </p>
            <p>
                <strong>Created At:</strong> {new Date(property.createdAt).toLocaleString()}
            </p>
        </div>
    );
};

export default Property;
