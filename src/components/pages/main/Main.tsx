import React, {FC} from 'react';
import Navbar from "../../ui/navbar/Navbar";
import AddressAutocomplete from "../../ui/autocomplete/AddressAutocomplete";

const Main: FC = () => {
    return (
        <div>
            <Navbar/>
            Главная страница
            <AddressAutocomplete/>
        </div>
    );
};

export default Main;