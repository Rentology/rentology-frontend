import React from 'react';
import cl from './LoginButton.module.css'
interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const LoginButton : React.FC<LoginButtonProps>  = (props) => {
    return (
        <button {...props} className={cl.loginButton}>
        </button>
    );
};

export default LoginButton;