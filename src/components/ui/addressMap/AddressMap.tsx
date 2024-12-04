import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

declare global {
    interface Window {
        ymaps: any;
    }
}

const YandexMapWithZoom: React.FC<{ address: string }> = ({ address }) => {
    const [coordinates, setCoordinates] = useState<[number, number]>([55.751244, 37.618423]); // Москва по умолчанию
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const geocodeAddress = async () => {
            try {
                const ymaps = window.ymaps;
                if (ymaps) {
                    await ymaps.ready();
                    const geocodeResult = await ymaps.geocode(address);
                    const firstGeoObject = geocodeResult.geoObjects.get(0);
                    if (firstGeoObject) {
                        const coords = firstGeoObject.geometry.getCoordinates();
                        setCoordinates(coords);
                    }
                } else {
                    console.error("Yandex Maps API не загружен");
                }
            } catch (error) {
                console.error("Ошибка геокодирования:", error);
            } finally {
                setIsLoading(false);
            }
        };

        geocodeAddress();
    }, [address]);

    return (
        <YMaps>
            <div style={{ width: "100%", height: "400px" }}>
                {!isLoading && (
                    <Map
                        defaultState={{
                            center: coordinates,
                            zoom: 16, // Устанавливаем начальный зум
                            controls: ['zoomControl'], // Добавляем контрол для управления зумом
                        }}
                        modules={['control.ZoomControl']} // Подключаем модуль для работы с zoomControl
                        width="100%"
                        height="100%"
                    >
                        <Placemark geometry={coordinates} />
                    </Map>
                )}
                {isLoading && <p>Загрузка карты...</p>}
            </div>
        </YMaps>
    );
};

export default YandexMapWithZoom;
