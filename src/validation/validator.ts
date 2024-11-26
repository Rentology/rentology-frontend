export const validateEmail = (email: string) : [boolean, string] => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return [false, "Некорректный формат email"];
    }
    return [true, ""];
}

export const validateDate = (date: string): [boolean, string] => {
    // Регулярное выражение для проверки формата YYYY-MM-DD
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    if (!regex.test(date)) {
        return [false, "Неправильный формат даты. Ожидалось YYYY-MM-DD."];
    }

    // Проверка на валидную дату (например, 2023-02-30 невалидно)
    const parsedDate = new Date(date);
    const [year, month, day] = date.split("-").map(Number);

    if (
        parsedDate.getFullYear() !== year ||
        parsedDate.getMonth() + 1 !== month ||
        parsedDate.getDate() !== day
    ) {
        return [false, "Неправильный формат даты. Ожидалось YYYY-MM-DD."];
    }

    return [true, "Valid date"];
}

export const validatePhone = (phone: string): [boolean, string] => {
    // Регулярное выражение для валидации телефона с международным кодом или без
    const phoneRegex = /^(?:\+?(\d{1,3}))?[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/;

    if (!phoneRegex.test(phone)) {
        return [false, "Некорректный формат телефона"];
    }

    return [true, ""];
}
