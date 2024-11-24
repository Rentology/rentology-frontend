import React from 'react';
import cl from './DefaultButton.module.css'
interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DefaultButton : React.FC<LoginButtonProps>  = ({className, ...props}) => {
    const rootClasses = [cl.defaultButton];
    if (className) {
        rootClasses.push(className);
    }

    return (
        <button {...props} className={rootClasses.join(' ')}>
        </button>
    );
};

export default DefaultButton;