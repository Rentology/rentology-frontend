import React, {FC, useContext, useState} from 'react';
import LoginInput from "../../ui/input/LoginInput";
import cl from './RegisterForm.module.css';
import {AuthContext} from "../../../index";
import LoginButton from "../../ui/button/LoginButton";
import logo from '../../../assets/images/logo.png';
import {observer} from "mobx-react-lite";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

const RegisterForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState<boolean>(false);

    const [authError, setAuthError] = useState<boolean>(false)
    const [passwordsError, setPasswordsError] = useState<boolean>(false)

    const {store} = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogin = () => {
        let hasError = false;

        setEmailError(false)
        setPasswordError(false)
        setRepeatPasswordError(false)
        setPasswordsError(false)

        if (!email) {
            setEmailError(true);
            hasError = true;
        }

        if (!password) {
            setPasswordError(true);
            hasError = true;
        }

        if (!repeatPassword) {
            setRepeatPasswordError(true);
            hasError = true;
        }

        if (password !== repeatPassword && password !== "" && repeatPassword !== "") {
            setPasswordsError(true)
            hasError = true
        }

        if (!hasError) {
            store.register(email, password).then((response) => {
                if (response instanceof AxiosError) {
                    setAuthError(true)
                }
                else {
                    navigate("/login")
                }
            });
        }
    };

    return (
        <div className={cl.registerPage}>
            <div className={cl.imageContainerLeft}></div>
            <div className={cl.registerWrapper}>
                <div className={cl.registerForm}>
                    <img className={cl.logo} src={logo} alt=""/>
                    <p>Войдите, чтобы продолжить</p>
                    <LoginInput
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Почта"
                        className={emailError ? cl.errorBorder : ''} // добавляем класс для ошибки
                    />
                    {authError && <div style={{color: 'red'}}>Пользователь с такой почтой уже существует</div>}
                    <LoginInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Пароль"
                        className={passwordError ? cl.errorBorder : ''} // добавляем класс для ошибки
                    />
                    <LoginInput
                        onChange={e => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                        type="password"
                        placeholder="Повторите пароль"
                        className={repeatPasswordError ? cl.errorBorder : ''} // добавляем класс для ошибки
                    />
                    {passwordsError && <div style={{color: 'red'}}>Пароли не совпадают</div>}
                    <LoginButton onClick={handleLogin}>Зарегистрироваться</LoginButton>
                </div>
            </div>
            <div className={cl.imageContainerRight}></div>
        </div>
    );
};

export default observer(RegisterForm);
