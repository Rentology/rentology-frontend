import React, {useContext} from 'react';
import cl from './Navbar.module.css';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../../assets/images/logo.png'
import {AuthContext} from "../../../index";
const Navbar = () => {

    const {store} = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <nav className={cl.navbar}>
            <div className={cl.navbar__logo}>
                <img src={logo} alt="logo"/>
                <div onClick={() => navigate('/main')}>Rentology</div>
            </div>
            <div className={cl.navbar__buttons}>
                <button className={cl.navbar__button}><Link to="/profile">Профиль</Link></button>
                <button className={cl.navbar__button}><Link to="/add-property">Разместить объявление</Link></button>
                <button className={cl.navbar__button} onClick={() => store.logout()}>Выйти</button>
            </div>

        </nav>
    );
};
export default Navbar;
