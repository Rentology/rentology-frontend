import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    MenuItem,
    Typography,
    Paper,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from "../../ui/navbar/Navbar";
import AddressAutocomplete from '../../ui/autocomplete/AddressAutocomplete';
import {AddPropertyRequest} from "../../../models/request/AddPropertyRequest";
import {IProperty} from "../../../models/IProperty";
import {IPropertyDetails} from "../../../models/IPropertyDetails";
import PropertyService from "../../../services/PropertyService";

const AddProperty: React.FC = () => {
    const [property, setProperty] = useState<IProperty>({
        title: '',
        location: '',
        price: 0,
        propertyType: 'apartment',
        rentalType: 'longTerm',
        maxGuests: 0,
    });

    const [details, setDetails] = useState<IPropertyDetails>({
        floor: 0,
        maxFloor: 0,
        area: 0,
        rooms: 0,
        houseCreationYear: 0,
        houseType: '',
        description: '',
    });

    const [images, setImages] = useState<{ id: string; url: string, base64: string }[]>([]);

    const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
        console.log(property)
    };

    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const uploadedImages = await Promise.all(
                Array.from(e.target.files).map(async (file) => {
                    const url = URL.createObjectURL(file);
                    const id = Math.random().toString(36).substr(2, 9);

                    // Конвертация в Base64
                    const base64 = await convertToBase64(file);

                    return { id, url, base64 };
                })
            );
            setImages((prev) => [...prev, ...uploadedImages]);
        }
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };


    const handleRemoveImage = (id: string) => {
        setImages((prev) => prev.filter((image) => image.id !== id));
    };

    const handleSubmit = async () => {
        console.log('Property:', property);
        console.log('Details:', details);
        console.log('Images:', images);

        const request : AddPropertyRequest = {
            property: property,
            propertyDetails: details,
            images: images.map((image) => image.base64)
        }
        console.log(request)

        const response = await PropertyService.createProperty(request)

        console.log(response.data)


    };

    return (
        <div>
            <Navbar />
            <Paper
                elevation={3}
                sx={{ padding: 4, margin: '20px auto', maxWidth: 800 }}
            >
                <Typography variant="h5" gutterBottom>
                    Добавить собственность
                </Typography>
                <Box component="form" onSubmit={(e) => e.preventDefault()}>
                    <Grid container spacing={2}>
                        {/* Основная информация */}
                        <Grid item xs={12}>
                            <Typography variant="h6">Основная информация</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Название"
                                name="title"
                                value={property.title}
                                onChange={handlePropertyChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AddressAutocomplete setAddress={(address) => {setProperty({...property, location: address})}} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Цена"
                                name="price"
                                type="number"
                                value={property.price === 0 ? "" : property.price}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setProperty((prev) => ({
                                        ...prev,
                                        price: value === "" ? 0 : Number(value), // Преобразуем в число
                                    }));
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Максимальное количество гостей"
                                name="maxGuests"
                                type="number"
                                value={property.maxGuests === 0 ? "" : property.maxGuests}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setProperty((prev) => ({
                                        ...prev,
                                        maxGuests: value === "" ? 0 : Number(value), // Преобразуем в число
                                    }));
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                select
                                label="Тип собственности"
                                name="propertyType"
                                value={property.propertyType}
                                onChange={handlePropertyChange}
                            >
                                <MenuItem value="house">Дом</MenuItem>
                                <MenuItem value="apartment">Квартира</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                select
                                label="Тип аренды"
                                name="rentalType"
                                value={property.rentalType}
                                onChange={handlePropertyChange}
                            >
                                <MenuItem value="shortTerm">Краткосрочная</MenuItem>
                                <MenuItem value="longTerm">Долгосрочная</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Детали */}
                        <Grid item xs={12}>
                            <Typography variant="h6">Детали собственности</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Этаж"
                                name="floor"
                                type="number"
                                value={details.floor === 0 ? "" : details.floor}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setDetails((prev) => ({
                                        ...prev,
                                        floor: value === "" ? 0 : Number(value), // Преобразуем в число
                                    }));
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Максимальный этаж"
                                name="maxFloor"
                                type="number"
                                value={details.maxFloor === 0 ? "" : details.maxFloor}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setDetails((prev) => ({
                                        ...prev,
                                        maxFloor: value === "" ? 0 : Number(value), // Преобразуем в число
                                    }));
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Площадь (м²)"
                                name="area"
                                type="number"
                                value={details.area === 0 ? "" : details.area}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setDetails((prev) => ({
                                        ...prev,
                                        area: value === "" ? 0 : Number(value), // Преобразуем в число
                                    }));
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Количество комнат"
                                name="rooms"
                                type="number"
                                value={details.rooms === 0 ? "" : details.rooms}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setDetails((prev) => ({
                                        ...prev,
                                        rooms: value === "" ? 0 : Number(value), // Преобразуем в число
                                    }));
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Год постройки"
                                name="houseCreationYear"
                                type="number"
                                value={details.houseCreationYear === 0 ? "" : details.houseCreationYear}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setDetails((prev) => ({
                                        ...prev,
                                        houseCreationYear: value === "" ? 0 : Number(value), // Преобразуем в число
                                    }));
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Тип дома"
                                name="houseType"
                                value={details.houseType}
                                onChange={handleDetailsChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Описание"
                                name="description"
                                multiline
                                rows={4}
                                value={details.description}
                                onChange={handleDetailsChange}
                            />
                        </Grid>

                        {/* Изображения */}
                        <Grid item xs={12}>
                            <Typography variant="h6">Изображения</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" component="label">
                                Загрузить изображения
                                <input
                                    type="file"
                                    multiple
                                    hidden
                                    onChange={handleImageUpload}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    flexWrap: 'wrap',
                                    marginTop: 2,
                                }}
                            >
                                {images.map((img) => (
                                    <Box
                                        key={img.id}
                                        sx={{
                                            position: 'relative',
                                            width: '100px',
                                            height: '100px',
                                        }}
                                    >
                                        <img
                                            src={img.url}
                                            alt={`Property`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                border: '1px solid #ddd',
                                            }}
                                        />
                                        <IconButton
                                            size="small"
                                            onClick={() => handleRemoveImage(img.id)}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                backgroundColor: 'rgba(255,255,255,0.7)',
                                            }}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>

                        {/* Кнопка отправки */}
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Сохранить
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </div>
    );
};

export default AddProperty;
