import React from 'react';
import cl from './LoginInput.module.css';

interface LoginInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const LoginInput: React.FC<LoginInputProps> = (props) => {
    // Объединяем переданный className с cl.loginInput
    const combinedClassName = `${cl.loginInput} ${props.className || ''}`;

    return (
        <input {...props} className={combinedClassName} />
    );
};

export default LoginInput;
