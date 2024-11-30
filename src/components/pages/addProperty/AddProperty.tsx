import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    MenuItem,
    Typography,
    Paper,
} from '@mui/material';
import Navbar from "../../ui/navbar/Navbar";
import AddressAutocomplete from '../../ui/autocomplete/AddressAutocomplete'

const AddProperty: React.FC = () => {
    const [property, setProperty] = useState({
        title: '',
        location: '',
        price: '',
        propertyType: 'apartment',
        rentalType: 'longTerm',
        maxGuests: '',
    });

    const [details, setDetails] = useState({
        floor: '',
        maxFloor: '',
        area: '',
        rooms: '',
        houseCreationYear: '',
        houseType: '',
        description: '',
    });

    const [images, setImages] = useState<string[]>([]);

    const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };

    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const uploadedImages = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setImages((prev) => [...prev, ...uploadedImages]);
        }
    };


    const handleSubmit = () => {
        console.log('Property:', property);
        console.log('Details:', details);
        console.log('Images:', images);
        // Add logic to send data to the server
    };

    return (
        <div>
            <Navbar/>
            {/* Main Content */}
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
                            <AddressAutocomplete />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Цена"
                                name="price"
                                type="number"
                                value={property.price}
                                onChange={handlePropertyChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Максимальное количество гостей"
                                name="maxGuests"
                                type="number"
                                value={property.maxGuests}
                                onChange={handlePropertyChange}
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
                                value={details.floor}
                                onChange={handleDetailsChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Максимальный этаж"
                                name="maxFloor"
                                type="number"
                                value={details.maxFloor}
                                onChange={handleDetailsChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Площадь (м²)"
                                name="area"
                                type="number"
                                value={details.area}
                                onChange={handleDetailsChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Количество комнат"
                                name="rooms"
                                type="number"
                                value={details.rooms}
                                onChange={handleDetailsChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Год постройки"
                                name="houseCreationYear"
                                type="number"
                                value={details.houseCreationYear}
                                onChange={handleDetailsChange}
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
                                {images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Property Image ${index + 1}`}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            border: '1px solid #ddd',
                                        }}
                                    />
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
