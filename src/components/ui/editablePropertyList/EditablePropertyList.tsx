import React, {useEffect, useState} from 'react';
import EditableProperty from '../editableProperty/EditableProperty'; // Импортируем компонент EditableProperty
import { IProperty } from '../../../models/IProperty';
import cl from './EditablePropertyList.module.css';
import PropertyService from "../../../services/PropertyService"; // Подключаем стили

interface EditablePropertyListProps {
    ownerId: bigint
}
const EditablePropertyList: React.FC<EditablePropertyListProps> = ({ownerId}) => {
    // Пример списка свойств
    // const properties: IProperty[] = [
    //     {
    //         id: BigInt(1),
    //         ownerId: 1,
    //         title: "Квартира-студия, 53 м², 8/10 эт.",
    //         location: "рп. Новоивановское, Немчиновка",
    //         price: 100,
    //         propertyType: "apartment",
    //         rentalType: "longTerm",
    //         maxGuests: 4,
    //         createdAt: "2004",
    //     },
    //     {
    //         id: BigInt(2),
    //         ownerId: 2,
    //         title: "Дом, 120 м², 2 этажа",
    //         location: "Москва, Рублевское шоссе",
    //         price: 300,
    //         propertyType: "house",
    //         rentalType: "shortTerm",
    //         maxGuests: 8,
    //         createdAt: "2015",
    //     },
    // ];

    const [properties, setProperties] = useState<IProperty[]>([]); // Сохраняем массив загруженных URL
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await PropertyService.getPropertiesByOwnerId(ownerId)
                const propertyList = response.data
                setProperties(propertyList)
                console.log(response.data)
            }
            catch (err) {
                console.log(err)
            }

        }
        fetchProperties()
    }, [ownerId])



    return (
        <div className={cl.propertyList}>
            {properties.map((property) => (
                <EditableProperty key={property.id.toString()} property={property} />
            ))}
        </div>
    );
};

export default EditablePropertyList;
