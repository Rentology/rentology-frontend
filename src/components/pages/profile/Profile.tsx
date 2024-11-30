import React, { FC, useContext } from 'react';
import Navbar from "../../ui/navbar/Navbar";
import { AuthContext } from "../../../index";
import Info from "./info/Info";
import EditablePropertyList from "../../ui/editablePropertyList/EditablePropertyList";
import cl from "./Profile.module.css";

const Profile: FC = () => {
    const { store } = useContext(AuthContext);

    return (
        <div>
            <Navbar />
            <div className={cl.profilePage}>
                <div className={cl.profileInfo}>
                    <Info user={store.user} />
                </div>
                <div className={cl.properties}>
                    <EditablePropertyList ownerId={BigInt(1)}/>
                </div>
            </div>
        </div>
    );
};

export default Profile;
