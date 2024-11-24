import React, { FC, ReactNode } from 'react';
import cl from './ModalWindow.module.css';

interface ModalWindowProps {
    children: ReactNode; // Для вложенного контента
    visible: boolean; // Определяет видимость модального окна
    setVisible: (visible: boolean) => void; // Функция для изменения видимости
}

const ModalWindow: FC<ModalWindowProps> = ({ children, visible, setVisible }) => {
    const rootClasses = [cl.modalWindow];
    if (visible) {
        rootClasses.push(cl.active);
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.modalWindowContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;
