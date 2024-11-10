import React, {FC, useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import LoginForm from "./pages/login/LoginForm";
import {AuthContext} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter: FC = () => {
    const {store} = useContext(AuthContext)

    if (store.isLoading) {
        return (
          <div>Загрузка...</div>
        );
    }

    return (
        store.isAuth ? (
            <Routes>
                <Route path="/login" element={<Navigate to={"/main"} />} />
                <Route path="*" element={<Navigate to={"/main"} />} />
            </Routes>
        ) : (
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="*" element={<Navigate to={"/login"} />} />
            </Routes>
        )
    )
};

export default observer(AppRouter);