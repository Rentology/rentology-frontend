import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';

interface Suggestion {
    title: string;
    formatted_address: string;
}

interface AddressAutocompleteProps {
    setAddress: (address: string) => void
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({setAddress}) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const apiToken = process.env.REACT_APP_API_TOKEN;
    const fetchSuggestions = useCallback(async (input: string) => {
        if (input.length < 3) {
            setSuggestions([]);
            return;
        }

        setLoading(true);  // Начинаем загрузку
        try {
            const response = await axios.get('https://suggest-maps.yandex.ru/v1/suggest', {
                params: {
                    apikey: apiToken, // Замените на ваш API-ключ
                    text: input,
                    lang: 'ru_RU',
                    results: 5,
                    print_address: 1
                },
            });

            // Преобразуем ответ в нужный формат
            if (response.data && response.data.results) {
                const formattedSuggestions = response.data.results.map((result: any) => ({
                    title: result.title.text,
                    formatted_address: result.address.formatted_address,
                }));
                setSuggestions(formattedSuggestions);
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error('Ошибка при запросе автозаполнения:', error);
            setSuggestions([]);
        } finally {
            setLoading(false);  // Завершаем загрузку
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setQuery(value);
        setAddress(value)
        fetchSuggestions(value);
    };

    return (
        <div>
            <Autocomplete
                disablePortal
                options={suggestions}
                getOptionLabel={(option) => option.formatted_address}
                renderInput={(params) => (
                    <TextField {...params} label="Введите адрес" onChange={handleChange} />
                )}
                loading={loading}  // Показывает индикатор загрузки, если запрос в процессе
            />
        </div>
    );
};

export default AddressAutocomplete;
