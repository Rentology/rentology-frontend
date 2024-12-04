// Main.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyService from "../../../services/PropertyService";
import { IProperty } from "../../../models/IProperty";
import Property from "../../ui/property/Property";
import Navbar from "../../ui/navbar/Navbar";
import { Skeleton, Box } from "@mui/material";
import styles from "./Main.module.css";

const Main: React.FC = () => {
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredProperties, setFilteredProperties] = useState<IProperty[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await PropertyService.getAllProperties();
                // Проверяем, что response.data - это массив
                if (Array.isArray(response.data)) {
                    setProperties(response.data);
                    setFilteredProperties(response.data);
                } else {
                    console.error("Полученные данные не являются массивом:", response.data);
                }
                setLoading(false);
            } catch (err) {
                console.error("Ошибка при загрузке недвижимости:", err);
                setLoading(false);
            }
        };


        fetchProperties();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredProperties(properties);
        } else {
            const filtered = properties.filter(property =>
                property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProperties(filtered);
        }
    }, [searchQuery, properties]);

    return (
        <div className={styles.mainPage}>
            <Navbar />
            <div className={styles.searchBar}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Поиск по названию или локации"
                />
            </div>

            <div className={styles.propertyList}>
                {loading ? (
                    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
                        {/* Скелетоны карточек */}
                        {[...Array(6)].map((_, index) => (
                            <Box key={index} sx={{ padding: 2 }}>
                                <Skeleton variant="rectangular" width="100%" height={200} />
                                <Skeleton variant="text" width="60%" height={20} sx={{ marginTop: 1 }} />
                                <Skeleton variant="text" width="40%" height={20} sx={{ marginTop: 1 }} />
                            </Box>
                        ))}
                    </Box>
                ) : filteredProperties.length === 0 ? (
                    <p>Нет недвижимости, соответствующей запросу.</p>
                ) : (
                    filteredProperties.map((property) => (
                        <Property key={property.id} property={property} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Main;
