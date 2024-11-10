import React, {useContext} from 'react';
import cl from './Navbar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png'
import {AuthContext} from "../../../index";
const Navbar = () => {

    const {store} = useContext(AuthContext)

    return (
        <nav className={cl.navbar}>
            <div className={cl.navbar__logo}>
                <img src={logo} alt="logo"/>
                <div>Rentology</div>
            </div>
            <ul className={cl.navbar__links}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <button className={cl.navbar__button} onClick={() => store.logout()}>Выйти</button>
        </nav>
    );
};
export default Navbar;
