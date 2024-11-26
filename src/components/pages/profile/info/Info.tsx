import React, {FC} from 'react';
import styles from './Info.module.css';
import { IUser } from "../../../../models/IUser";
import logo from "../../../../assets/images/profile-logo.png"
import EditableField from "../../../ui/editableField/EditableField";
import {validateDate, validateEmail} from "../../../../validation/validator";
import UserService from "../../../../services/UserService";
const Info: FC<{ user: IUser | null }> = ({ user }) => {

    const displayedUser = user ?? {
        birthDate: "не указано",
        email: "не указано",
        id: BigInt(0),
        lastName: "не указано",
        name: "не указано",
        secondName: "не указано",
        sex: "не указано",
        profileImage: "https://via.placeholder.com/100", // Заглушка для картинки
    }

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
            <EditableField header="Укажите новую почту"
                           inputText="Адрес"
                           buttonText="Готово"
                           validate={validateEmail}
                           onClick={(value) => updateField("email", value)}>
                <p className={styles.info}>
                    Email: <span className={styles.highlight}>{displayedUser.email}</span>
                </p>
            </EditableField>
            <EditableField header="Укажите новую дату рождения"
                           inputText="Дата рождения"
                           buttonText="Готово"
                           validate={validateDate}
                           onClick={(value) => updateField("birthDate", value)}>
                <p className={styles.info}>
                    Дата рождения: <span className={styles.highlight}>{displayedUser.birthDate}</span>
                </p>
            </EditableField>
        </div>
    );
};

export default Info;
