import React, {FC, useContext} from 'react';
import Navbar from "../../ui/navbar/Navbar";
import {AuthContext} from "../../../index";
import Info from "./info/Info";
import Property from "./property/Property";
import {IProperty} from "../../../models/IProperty";

const Profile: FC = () => {
    const {store} = useContext(AuthContext)

    let prop : IProperty = {
        id: BigInt(1),
        ownerId: 1,
        title: "Квартира-студия, 53 м², 8/10 эт.",
        location: "рп. Новоивановское, Немчиновка",
        price: 100,
        propertyType: "apartment",
        rentalType: "longTerm",
        maxGuests: 4,
        createdAt: "2004"
    }

    return (
        <div>
            <Navbar/>
            <Info user={store.user}/>
            <Property property={prop}/>
        </div>
    );
};

export default Profile;