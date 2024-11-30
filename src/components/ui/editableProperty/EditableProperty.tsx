import React from 'react';
import { IProperty } from '../../../models/IProperty';
import Property from '../property/Property';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { Button, Menu, MenuItem } from '@mui/material';
import cl from './EditableProperty.module.css';

interface EditablePropertyProps {
    property: IProperty;
}

const EditableProperty: React.FC<EditablePropertyProps> = ({ property }) => {
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
                                <MenuItem onClick={popupState.close}>Редактировать</MenuItem>
                                <MenuItem onClick={popupState.close}>Удалить</MenuItem>
                                <MenuItem onClick={popupState.close}>Опубликовать</MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </div>
        </div>
    );
};

export default EditableProperty;
