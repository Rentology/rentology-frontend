import React, {useEffect, useState} from 'react';
import EditableProperty from '../editableProperty/EditableProperty'; // Импортируем компонент EditableProperty
import { IProperty } from '../../../models/IProperty';
import cl from './EditablePropertyList.module.css';
import PropertyService from "../../../services/PropertyService"; // Подключаем стили

interface EditablePropertyListProps {
    ownerId: bigint
}
const EditablePropertyList: React.FC<EditablePropertyListProps> = ({ownerId}) => {

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


    const handleDelete = (id: bigint) => {
        // Удаляем объект из списка
        setProperties((prevProperties) => prevProperties.filter((property) => property.id !== id));
    };


    return (
        <div className={cl.propertyList}>
            {properties.map((property) => (
                <EditableProperty key={(property.id || 0).toString()} property={property} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default EditablePropertyList;
