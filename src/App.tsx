import React, {useContext, useEffect} from 'react';
import './styles/app.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./index";
import {observer} from "mobx-react-lite";

function App() {

    const {store} = useContext(AuthContext)

    useEffect(() => {
        store.checkAuth().then(r => {
        })

    }, [store])


    return (
        <AuthContext.Provider value={{
            store
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>


    );
}

export default observer(App);
