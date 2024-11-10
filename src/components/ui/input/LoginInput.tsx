import React from 'react';
import cl from './LoginInput.module.css'

interface LoginInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const LoginInput: React.FC<LoginInputProps> = (props) => {
    return (
        <input {...props} className={cl.loginInput}/>
    );
};

export default LoginInput;