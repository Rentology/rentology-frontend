import React, {FC, useContext} from 'react';
import Navbar from "../../ui/navbar/Navbar";
import {AuthContext} from "../../../index";
import Info from "./info/Info";
import Properties from "./properties/Properties";

const Profile: FC = () => {
    const {store} = useContext(AuthContext)
    return (
        <div>
            <Navbar/>
            <Info user={store.user}/>
            <Properties/>
        </div>
    );
};

export default Profile;