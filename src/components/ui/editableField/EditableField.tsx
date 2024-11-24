import React, {FC, ReactNode, useEffect, useState} from 'react';
import ModalWindow from "../modal/ModalWindow";
import cl from "./EditableField.module.css"
import DefaultButton from "../button/defaultButton/DefaultButton";

interface EditableFieldProps {
    children: ReactNode
    header: string
    inputText: string
    buttonText: string
    validate?: (text: string) => [boolean, string];

}
const EditableField : FC<EditableFieldProps> = ({children, header, inputText, buttonText, validate}) => {
    const [modal, setModal] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [errorText, setErrorText] = useState<string>('')
    const [text, setText] = useState<string>('')
    const changeState = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        if (e.target.value !== "")
            setDisabled(false)
        else
            setDisabled(true)
    }

    useEffect(() => {
        if (!modal) {
            setText(""); // Очищаем поле ввода
            setDisabled(true); // Деактивируем кнопку после сброса
        }
    }, [modal]);

    const handle = () => {
        if (validate) {
            const [isValid, errorText] = validate(text)
            if (!isValid) {
                setError(true)
                setErrorText(errorText)
            }
            else {
                setError(false)
                setErrorText('')
            }
        }
    }
    return (
        <div className={cl.editableField}>
            <div className={cl.field}>
                {children}
                <button onClick={() => setModal(true)}>Редактировать</button>
            </div>
            <ModalWindow visible={modal} setVisible={setModal}>
                <div className={cl.edit}>
                    <h2 className={cl.header}>{header}</h2>
                    <input placeholder={inputText} value={text} onChange={e => changeState(e)}/>
                    {error && <p className={cl.errorText}>{errorText}</p>}
                    <DefaultButton className={cl.button} disabled={disabled} onClick={() => handle()}>{buttonText}</DefaultButton>
                </div>
            </ModalWindow>
        </div>
    );
};

export default EditableField;