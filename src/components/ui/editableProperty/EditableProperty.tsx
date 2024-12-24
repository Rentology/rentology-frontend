import React, { useState } from 'react';
import { IProperty } from '../../../models/IProperty';
import Property from '../property/Property';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { Button, Menu, MenuItem, CircularProgress } from '@mui/material';
import cl from './EditableProperty.module.css';
import PropertyService from "../../../services/PropertyService";

interface EditablePropertyProps {
    property: IProperty;
    onDelete: (id: bigint) => void; // Коллбек для удаления
}

const EditableProperty: React.FC<EditablePropertyProps> = ({ property, onDelete }) => {
    const [isLoading, setIsLoading] = useState(false);

    type PopupStateType = ReturnType<typeof PopupState>;

    const deleteProperty = async (popupState: PopupStateType) => {
        setIsLoading(true);
        try {
            if (property.id) {
                await PropertyService.deleteProperty(property.id); // Удаление с сервера
                onDelete(property.id); // Уведомляем родительский компонент
                console.log(`Property with ID ${property.id} deleted successfully`);
            }
            popupState.close();
        } catch (e) {
            console.error('Error deleting property:', e);
            popupState.close();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cl.property}>
            <Property property={property} />
            <div className={cl.actionButton}>
                <PopupState variant="popover" popupId={`menu-${property.id}`}>
                    {(popupState) => (
                        <React.Fragment>
                            <Button variant="contained" {...bindTrigger(popupState)}>
                                Действие
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={() => deleteProperty(popupState)}>
                                    {isLoading ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        "Удалить"
                                    )}
                                </MenuItem>
                                {/*<MenuItem onClick={popupState.close}>Редактировать</MenuItem>*/}
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </div>
        </div>
    );
};

export default EditableProperty;
