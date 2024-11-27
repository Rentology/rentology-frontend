import React, {FC, ReactNode, useEffect, useState} from 'react';
import ModalWindow from "../modal/ModalWindow";
import cl from "./EditableField.module.css"
import DefaultButton from "../button/defaultButton/DefaultButton";
import pencil from "../../../assets/images/pencil.png"
interface EditableFieldProps {
    children: ReactNode
    field: string
    blocked?: boolean
    header: string
    inputText: string
    buttonText: string
    validate?: (text: string) => [boolean, string]
    onClick?: (value : string) => Promise<void>
}
const EditableField : FC<EditableFieldProps> = ({children, field, blocked, header, inputText, buttonText, validate, onClick}) => {
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

    const handle = async () => {
        if (validate) {
            const [isValid, errorText] = validate(text)
            if (!isValid) {
                setError(true)
                setErrorText(errorText)
            } else {
                if (onClick) {
                    try {
                        await onClick(text)
                        setError(false)
                        setErrorText('')
                        setModal(false)
                    } catch (error) {
                        setError(true)
                        setErrorText('У нас какая-то ошибка :(')
                    }
                }
            }
        } else {
            if (onClick) {
                try {
                    await onClick(text)
                    setError(false)
                    setErrorText('')
                    setModal(false)
                } catch (error) {
                    setError(true)
                    setErrorText('У нас какая-то ошибка :(')
                }
            }
        }
    }
    return (
        <div className={cl.editableField}>
            <div className={cl.field}>
                <p className={cl.info}>
                    {field}: <span className={cl.highlight}>{children}</span>
                </p>
                {!blocked && <img className={cl.pencil} src={pencil} onClick={() => setModal(true)} alt={"pencil"}/>}
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