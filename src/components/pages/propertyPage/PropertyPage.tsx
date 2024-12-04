import React, {useEffect, useState} from "react";
import {Box, Button, Grid, IconButton, Skeleton, Typography} from "@mui/material";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import YandexMapWithAddress from "../../ui/addressMap/AddressMap";
import UserCard from "../../ui/userCard/UserCard";
import {IProperty} from "../../../models/IProperty";
import {IPropertyDetails} from "../../../models/IPropertyDetails";
import {useParams} from "react-router-dom";
import PropertyService from "../../../services/PropertyService";
import ImageService from "../../../services/ImageService";
import {Image} from "../../../models/Image";
import Navbar from "../../ui/navbar/Navbar";
import UserService from "../../../services/UserService";
import {IUser} from "../../../models/IUser";


const PropertyPage: React.FC = () => {

    const defaultProperty : IProperty = {
        id: BigInt(1),
        title: "Квартира-студия, 33 м², 3/23 эт.",
        location: "Москва",
        price: 77000,
        propertyType: "apartment",
        rentalType: "longTerm",
        maxGuests: 2,
    };

    const defaultPropertyDetails : IPropertyDetails = {
        propertyId: BigInt(1),
        floor: 3,
        maxFloor: 23,
        area: 33,
        rooms: 1,
        houseCreationYear: 2012,
        houseType: "Монолит",
        description: "Стильная квартира-студия с современным ремонтом и всеми удобствами.",
    };

    const defaultImages = [
        "https://via.placeholder.com/800x600",
        "https://via.placeholder.com/100",
        "https://via.placeholder.com/100"
    ]

    const { id } = useParams<{ id: string }>(); // извлекаем id из URL


    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [property, setProperty] = useState<IProperty>(defaultProperty)
    const [propertyDetails, setPropertyDetails] = useState<IPropertyDetails>(defaultPropertyDetails)
    const [owner, setOwner] = useState<IUser>()
    const [images, setImages] = useState<string[]>(defaultImages);
    const [imagesLoading, setImagesLoading] = useState<boolean>(false)
    const [propertiesLoading, setPropertiesLoading] = useState<boolean>(false)

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                if (id) {
                    setPropertiesLoading(true)
                    const propertyResponse = await PropertyService.getPropertyById(BigInt(id));
                    console.log(propertyResponse.data);

                    setProperty(propertyResponse.data);
                }
            } catch (e) {
                console.error("Ошибка при загрузке данных", e);
            }
            finally {
                setPropertiesLoading(false)
            }
        };

        fetchPropertyData();
    }, [id]);  // Зависимость от id


    useEffect(() => {
        const fetchImages = async () => {
            try {
                setImagesLoading(true)
                console.log(property); // В этом месте property уже актуальное
                if (property.id) {
                    const response = await ImageService.getImageByPropertyId(property.id);
                    const imageList: Image[] = response.data;
                    console.log(imageList);

                    // Загружаем каждую картинку по её ID
                    const loadedImages = await Promise.all(
                        imageList.map(async (image) => {
                            const blob = await ImageService.getImageById(BigInt(image.id)); // Получаем Blob по ID
                            return URL.createObjectURL(blob); // Возвращаем объект с URL
                        })
                    );

                    setImages(loadedImages); // Сохраняем загруженные URL в состоянии
                }
            } catch (err) {
                console.error("Ошибка при загрузке изображений:", err);
            }
            finally {
                setImagesLoading(false)
            }
        };

        if (property.id) {
            fetchImages();
        }
    }, [property.id])

    useEffect(() => {
        const fetchPropertyDetailsData = async () => {
            try {
                if (id) {
                    console.log(property.id)
                    setPropertiesLoading(true)
                    const propertyDetailsResponse = await PropertyService.getPropertyDetailsById(BigInt(id));
                    console.log(propertyDetailsResponse.data)
                    setPropertyDetails(propertyDetailsResponse.data);
                }
            } catch (e) {
                console.error("Ошибка при загрузке данных", e);
            }
            finally {
                setPropertiesLoading(false)
            }
        };

        fetchPropertyDetailsData();
    }, [property.id]);

    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                if (property.ownerId) {
                    console.log(property.id)
                    const ownerUserResponse = await UserService.getUserById(BigInt(property.ownerId))
                    setOwner(ownerUserResponse.data)
                }
            } catch (e) {
                console.error("Ошибка при загрузке данных", e);
            }
        };

        fetchOwnerData();
    }, [property.id]);





    return (
        <div>
            <Navbar/>
            <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={8}>
                        {propertiesLoading ? (
                            <Skeleton variant="rounded"></Skeleton>
                        ) : (
                            <Typography variant="h4">{property.title}</Typography>
                        )}
                        <Typography variant="subtitle1" color="textSecondary">
                            {propertyDetails.area} м², {propertyDetails.floor}/{propertyDetails.maxFloor} этаж
                        </Typography>
                        <Box mt={2} sx={{ position: "relative", maxWidth: "600px" }}>
                            {!imagesLoading ? (
                                    <Box
                                        component="img"
                                        src={images[currentIndex]}
                                        alt={property.title}
                                        sx={{
                                            width: "100%",
                                            maxWidth: "600px",
                                            height: "400px",
                                            borderRadius: "8px",
                                            border: "1px solid #ddd",
                                            objectFit: "cover",
                                        }}
                                    />
                                )
                                : (
                                    <Skeleton variant="rounded" width={600} height={400}></Skeleton>
                                )
                            }

                            <IconButton
                                onClick={handlePrevImage}
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "10px",
                                    transform: "translateY(-50%)",
                                    background: "rgba(255, 255, 255, 0.7)",
                                    '&:hover': { background: "rgba(255, 255, 255, 1)" },
                                }}
                            >
                                <ArrowBack />
                            </IconButton>
                            <IconButton
                                onClick={handleNextImage}
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                    background: "rgba(255, 255, 255, 0.7)",
                                    '&:hover': { background: "rgba(255, 255, 255, 1)" },
                                }}
                            >
                                <ArrowForward />
                            </IconButton>
                        </Box>
                        {!imagesLoading ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                        marginTop: 2,
                                    }}
                                >
                                    {images.map((url, index) => (
                                        <Box
                                            component="img"
                                            key={index}
                                            src={url}
                                            alt={`${property.title} - ${index}`}
                                            onClick={() => setCurrentIndex(index)}
                                            sx={{
                                                width: "calc(16.66% - 8px)", // 6 картинок в строке
                                                maxWidth: "150px",
                                                height: "150px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                                border: "1px solid #ddd",
                                                cursor: "pointer",
                                                opacity: currentIndex === index ? 0.6 : 1,
                                            }}
                                        />
                                    ))}
                                </Box>
                            )
                            : (
                                <Skeleton variant="rounded" width={600} height={200} style={{marginTop: "20px"}}></Skeleton>
                            )
                        }


                        <Box mt={4}>
                            <Typography variant="h5">О квартире</Typography>
                            <Typography variant="body1" mt={1}>
                                {propertyDetails.description}
                            </Typography>
                        </Box>

                        <Box mt={4}>
                            <Typography variant="h5">Детали</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Box>
                                        <Typography variant="body2" mt={1}>
                                            <strong>Этаж:</strong> {propertyDetails.floor}/{propertyDetails.maxFloor}
                                        </Typography>
                                        <Typography variant="body2" mt={1}>
                                            <strong>Площадь:</strong> {propertyDetails.area} м²
                                        </Typography>
                                        <Typography variant="body2" mt={1}>
                                            <strong>Комнаты:</strong> {propertyDetails.rooms}
                                        </Typography>
                                        <Typography variant="body2" mt={1}>
                                            <strong>Тип дома:</strong> {propertyDetails.houseType}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box>
                                        <Typography variant="body2" mt={1}>
                                            <strong>Максимальное количество гостей:</strong> {property.maxGuests}
                                        </Typography>
                                        <Typography variant="body2" mt={1}>
                                            <strong>Построен:</strong> {propertyDetails.houseCreationYear} г.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{paddingTop: 2, width: 600}}>
                            <Typography variant="h5">Расположение</Typography>
                            <Typography variant="body2" mt={1}>
                                <strong>{property.location}</strong>
                            </Typography>
                            <YandexMapWithAddress address={property.location} />
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Grid sx={{ padding: 2 }}>
                            <Typography variant="h4">{property.price} ₽ в {property.rentalType == "shortTerm" ? 'день' : 'месяц'} </Typography>
                            <Typography variant="body2" color="textSecondary" mt={1}>
                                Без комиссии
                            </Typography>

                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Показать телефон
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 1 }}
                            >
                                Написать сообщение
                            </Button>
                        </Grid>
                        <UserCard name={owner?.name || 'Неизвестно'} role={'Арендодатель'}/>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default PropertyPage;
