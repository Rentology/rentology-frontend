import React, {FC, useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import LoginForm from "./pages/login/LoginForm";
import {AuthContext} from "../index";
import {observer} from "mobx-react-lite";
import Main from "./pages/main/Main";
import RegisterForm from "./pages/register/RegisterForm";
import Profile from './pages/profile/Profile';
import AddProperty from "./pages/addProperty/AddProperty";

const AppRouter: FC = () => {
    const {store} = useContext(AuthContext)

    if (store.isLoading) {
        return (
          <div>Загрузка...</div>
        );
    }


    if (store.isAuth) {
        return (
            <Routes>
                <Route path="/main" element={<Main/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/edit" element={<AddProperty/>}/>
                <Route path="*" element={<Navigate to={"/main"} />} />
            </Routes>
        )
    }
    else {
        return (
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="*" element={<Navigate to={"/login"} />} />
            </Routes>
        )
    }
};

export default observer(AppRouter);