import React, {FC, useState} from 'react';
import styles from './Info.module.css';
import { IUser } from "../../../../models/IUser";
import logo from "../../../../assets/images/profile-logo.png"
import EditableField from "../../../ui/editableField/EditableField";
import {validateDate, validateEmail, validatePhone} from "../../../../validation/validator";
import UserService from "../../../../services/UserService";
const Info: FC<{ user: IUser | null }> = ({ user }) => {

    const [displayedUser, setDisplayedUser] = useState<IUser>({
        birthDate: user?.birthDate?.trim() || "не указано",
        email: user?.email?.trim() || "не указано",
        id: user?.id ?? BigInt(0),
        lastName: user?.lastName?.trim() || "не указано",
        name: user?.name?.trim() || "не указано",
        secondName: user?.secondName?.trim() || "не указано",
        sex: user?.sex?.trim() || "не указано",
        phone: user?.phone?.trim() || "не указано",
    });


    const updateField = async (field: string, value: string) => {
        console.log(localStorage.getItem("id"))
        const updateUser: IUser = {
            id: BigInt(localStorage.getItem("id") || ""),
            email: "",
            phone: null,
            name: null,
            lastName: null,
            secondName: null,
            birthDate: null,
            sex: null,
            [field]: value
        }
        const response = await UserService.updateUser(updateUser);
        if (response.status === 200) {
            console.log(`Поле ${field} успешно обновлено.`);
            setDisplayedUser((prevUser) => ({
                ...prevUser,
                [field]: value,
            }));
        } else {
            console.error(`Ошибка обновления поля ${field}:`, response.data);
        }
    }


    return (
        <div className={styles.container}>
            <img
                src={logo}
                alt="Профиль пользователя"
                className={styles.profileImage}
            />
            <EditableField
                field="Имя"
                header="Укажите новое имя"
                inputText="Имя"
                buttonText="Готово"
                onClick={(value) => updateField("name", value)}>
                {displayedUser.name}
            </EditableField>
            <EditableField
                field="Фамилия"
                header="Укажите новую фамилию"
                inputText="Фамилия"
                buttonText="Готово"
                onClick={(value) => updateField("lastName", value)}>
                {displayedUser.lastName}
            </EditableField>
            <EditableField
                field="Отчество"
                header="Укажите новое отчество"
                inputText="Отчество"
                buttonText="Готово"
                onClick={(value) => updateField("secondName", value)}>
                {displayedUser.secondName}
            </EditableField>
            <EditableField
                           field="Email"
                           header="Укажите новую почту"
                           inputText="Адрес"
                           buttonText="Готово"
                           validate={validateEmail}
                           onClick={(value) => updateField("email", value)}>
                {displayedUser.email}
            </EditableField>
            <EditableField
                field="Телефон"
                header="Укажите новый номер телефона"
                inputText="Номер телефона"
                buttonText="Готово"
                validate={validatePhone}
                onClick={(value) => updateField("phone", value)}>
                {displayedUser.phone}
            </EditableField>
            <EditableField
                           field="Дата рождения"
                           header="Укажите новую дату рождения"
                           inputText="Дата рождения"
                           buttonText="Готово"
                           validate={validateDate}
                           onClick={(value) => updateField("birthDate", value)}>
                {displayedUser.birthDate}
            </EditableField>
        </div>
    );
};

export default Info;
