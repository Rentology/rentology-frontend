import React, { useEffect, useState } from "react";
import styles from "./Property.module.css";
import { IProperty } from "../../../models/IProperty";
import cl from "./Property.module.css";
import SimpleImageSlider from "react-simple-image-slider";
import ImageService from "../../../services/ImageService";
import { Image } from "../../../models/Image";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material"; // Импортируем Skeleton

interface PropertyProps {
    property: IProperty;
}

const Property: React.FC<PropertyProps> = ({ property }) => {
    const [images, setImages] = useState<{ url: string }[]>([]); // Сохраняем массив загруженных URL
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await ImageService.getImageByPropertyId(property.id || BigInt(0));
                const imageList: Image[] = response.data;
                const loadedImages = await Promise.all(
                    imageList.map(async (image) => {
                        const blob = await ImageService.getImageById(BigInt(image.id));
                        const url = URL.createObjectURL(blob);
                        return { url };
                    })
                );

                setImages(loadedImages);
                setLoading(false);
            } catch (err) {
                console.error("Ошибка при загрузке изображений:", err);
                setError("Не удалось загрузить изображения");
                setLoading(false);
            }
        };

        fetchImages();

        return () => {
            images.forEach((image) => URL.revokeObjectURL(image.url));
        };
    }, [property.id]);

    const priceText = property.rentalType === "shortTerm" ? "в день" : "в месяц";

    const handleTitleClick = () => {
        navigate(`/properties/${property.id}`);
    };

    return (
        <div className={styles.property}>
            <div
                style={{
                    width: 250,
                    height: 250,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                }}
            >
                {loading ? (
                    <Skeleton variant="rounded" width={250} height={250} />
                ) : error ? (
                    <p style={{ textAlign: "center" }}>{error}</p>
                ) : (
                    <SimpleImageSlider
                        onClick={handleTitleClick}
                        width={250}
                        height={250}
                        images={images}
                        showNavs={true}
                        showBullets={true}
                    />
                )}
            </div>
            <div>
                {loading ? (
                    <Skeleton variant="text" width={200} height={30} />
                ) : (
                    <h3 className={cl.title} onClick={handleTitleClick}>
                        {property.title}
                    </h3>
                )}
                {loading ? (
                    <Skeleton variant="text" width={100} height={20} />
                ) : (
                    <p className={cl.price}>
                        {property.price} ₽ {priceText}
                    </p>
                )}
                {loading ? (
                    <Skeleton variant="text" width={150} height={20} />
                ) : (
                    <p className={cl.location}>{property.location}</p>
                )}
            </div>
        </div>
    );
};

export default Property;
