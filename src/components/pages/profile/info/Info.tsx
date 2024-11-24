import React, { FC } from 'react';
import styles from './Info.module.css';
import { IUser } from "../../../../models/IUser";
import logo from "../../../../assets/images/profile-logo.png"
import EditableField from "../../../ui/editableField/EditableField";
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
    };

    const validateEmail = (email: string) : [boolean, string] => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return [false, "Некорректный формат email"];
        }
        return [true, ""];
    }

    return (
        <div className={styles.container}>
            <img
                src={logo}
                alt="Профиль пользователя"
                className={styles.profileImage}
            />
            <p className={styles.header}>
                {displayedUser.lastName} {displayedUser.name} {displayedUser.secondName}
            </p>
            <p className={styles.info}>
                Email: <span className={styles.highlight}>{displayedUser.email}</span>
            </p>
            <p className={styles.info}>
                Дата рождения: <span className={styles.highlight}>{displayedUser.birthDate}</span>
            </p>
            <EditableField header="Укажите новую почту"
                           inputText="Адрес"
                           buttonText="Готово"
                           validate={validateEmail}>
                <p className={styles.info}>
                    Email: <span className={styles.highlight}>{displayedUser.email}</span>
                </p>
            </EditableField>
        </div>
    );
};

export default Info;
