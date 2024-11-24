import React, {FC, useContext, useState} from 'react';
import LoginInput from "../../ui/input/LoginInput";
import cl from './LoginForm.module.css';
import {AuthContext} from "../../../index";
import LoginButton from "../../ui/button/loginButton/LoginButton";
import peopleImage1 from '../../../assets/images/people1.png';
import peopleImage2 from '../../../assets/images/people2.png';
import logo from '../../../assets/images/logo.png';
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [authError, setAuthError] = useState<boolean>(false)
    const {store} = useContext(AuthContext);

    const handleLogin = () => {
        let hasError = false;

        if (!email) {
            setEmailError(true);
            hasError = true;
        } else {
            setEmailError(false);
        }

        if (!password) {
            setPasswordError(true);
            hasError = true;
        } else {
            setPasswordError(false);
        }

        if (!hasError) {
            store.login(email, password).then(() => {
                if (!store.isAuth) {
                    setAuthError(true)
                }
            });
        }
    };

    return (
        <div className={cl.loginPage}>
            <div className={cl.imageContainerLeft} style={{backgroundImage: `url(${peopleImage1})`}}></div>
            <div className={cl.loginWrapper}>
                <div className={cl.loginForm}>
                    <img className={cl.logo} src={logo} alt=""/>
                    <p>Войдите, чтобы продолжить</p>
                    <LoginInput
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Почта"
                        className={emailError ? cl.errorBorder : ''} // добавляем класс для ошибки
                    />
                    {authError && <div style={{color: 'red'}}>Неправильный логин или пароль</div>}
                    <LoginInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Пароль"
                        className={passwordError ? cl.errorBorder : ''} // добавляем класс для ошибки
                    />
                    <LoginButton onClick={handleLogin}>Авторизация</LoginButton>
                </div>
            </div>
            <div className={cl.imageContainerRight} style={{backgroundImage: `url(${peopleImage2})`}}></div>
        </div>
    );
};

export default observer(LoginForm);
