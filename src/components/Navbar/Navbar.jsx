import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../Router';
import './navbar.css';

const NavBar = () => {

    return (
        <header className="navbar-container" >
            <NavLink
                className={({ isActive }) => `${isActive && 'active'} navbar-link`}
                to={ROUTES.HOME.route}
            >
                <p>{ROUTES.HOME.label}</p>
            </NavLink>
            <NavLink
                className={({ isActive }) => `${isActive && 'active'} navbar-link`}
                to={ROUTES.ABOUT.route}
            >
                <p>{ROUTES.ABOUT.label}</p>
            </NavLink>
            <NavLink
                className={({ isActive }) => `${isActive && 'active'} navbar-link`}
                to={ROUTES.PROJECTS.route}
            >
                <p>{ROUTES.PROJECTS.label}</p>
            </NavLink>
            <NavLink
                className={({ isActive }) => `${isActive && 'active'} navbar-link`}
                to={ROUTES.CONTACT.route}
            >
                <p>{ROUTES.CONTACT.label}</p>
            </NavLink>
        </header>
    )
}

export default NavBar;