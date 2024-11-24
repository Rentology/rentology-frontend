import React, { useState } from "react";
import Property, { Property as PropertyType } from "../property/Property";
import styles from "./Properties.module.css";

const Properties: React.FC = () => {
    const [properties, setProperties] = useState<PropertyType[]>([]);
    const [title, setTitle] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    // Функция для добавления нового объекта Property
    const createProperty = () => {
        const newProperty: PropertyType = {
            id: properties.length + 1, // Генерация ID
            ownerId: 1, // Пример: фиксированный Owner ID
            title,
            location,
            price,
            propertyType: "house", // Значение по умолчанию
            rentalType: "shortTerm", // Значение по умолчанию
            maxGuests: 4, // Пример
            createdAt: new Date().toISOString(), // Текущая дата
        };

        setProperties([...properties, newProperty]); // Обновляем список
        // Очищаем форму
        setTitle("");
        setLocation("");
        setPrice(0);
    };

    return (
        <div className={styles.properties}>
            <h1>Properties</h1>

            {/* Форма для добавления недвижимости */}
            <div className={styles.form}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <button onClick={createProperty}>Add Property</button>
            </div>

            <div className={styles["properties-list"]}>
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <Property key={property.id} property={property} />
                    ))
                ) : (
                    <p>No properties found</p>
                )}
            </div>
        </div>
    );
};

export default Properties;
