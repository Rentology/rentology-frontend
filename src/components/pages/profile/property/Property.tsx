import React, { useEffect, useState } from "react";
import styles from "./Property.module.css";
import { IProperty } from "../../../../models/IProperty";
import cl from "./Property.module.css";
import SimpleImageSlider from "react-simple-image-slider";
import ImageService from "../../../../services/ImageService";
import { Image } from "../../../../models/Image";

interface PropertyProps {
    property: IProperty;
}

const Property: React.FC<PropertyProps> = ({ property }) => {
    const [images, setImages] = useState<{ url: string }[]>([]); // Сохраняем массив загруженных URL
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Получаем массив изображений по propertyId
                const response = await ImageService.getImageByPropertyId(property.id);
                const imageList: Image[] = response.data;
                console.log(imageList)

                // Загружаем каждую картинку по её ID
                const loadedImages = await Promise.all(
                    imageList.map(async (image) => {
                        const blob = await ImageService.getImageById(BigInt(image.id)); // Получаем Blob по ID
                        const url = URL.createObjectURL(blob); // Создаём URL из Blob
                        return { url }; // Возвращаем объект с URL
                    })
                );

                setImages(loadedImages); // Сохраняем загруженные URL в состоянии
                setLoading(false);
            } catch (err) {
                console.error("Ошибка при загрузке изображений:", err);
                setError("Не удалось загрузить изображения");
                setLoading(false);
            }
        };

        fetchImages();

        // Очищаем URL при размонтировании
        return () => {
            images.forEach((image) => URL.revokeObjectURL(image.url));
        };
    }, [property.id]);

    const priceText = property.rentalType === "shortTerm" ? "в день" : "в месяц";

    return (
        <div className={styles.property}>
            <div style={{ width: 250, height: 250, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {loading ? (
                    // Индикатор загрузки
                    <div className={cl.spinner}></div>
                ) : error ? (
                    <p style={{textAlign: "center"}}>{error}</p>
                ) : (
                    // Слайдер, когда данные загружены
                    <SimpleImageSlider width={250} height={250} images={images} showNavs={true} showBullets={true} />
                )}
            </div>
            <div>
                <h3 className={cl.title}>{property.title}</h3>
                <p className={cl.price}>{property.price} ₽ {priceText}</p>
                <p className={cl.location}>{property.location}</p>
            </div>
        </div>
    );
};

export default Property;
