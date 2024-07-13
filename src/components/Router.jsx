import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { Home, About, Projects, Contact } from '../pages';

export const ROUTES = {
    HOME: {
        route: '/',
        label: 'Home',
        component: <Home />
    },
    ABOUT: {
        route: '/about',
        label: 'About',
        component: <About />
    },
    PROJECTS: {
        route: '/projects',
        label: 'Projects',
        component: <Projects />
    },
    CONTACT: {
        route: '/contact',
        label: 'Contact',
        component: <Contact />
    },
};

const Router = ({ children }) => {
    return (
        <BrowserRouter>
            {children}
            <Routes>
                {
                    Object.values(ROUTES).map(({ route, label, component }) => <Route key={route} path={route} element={component} />)
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
