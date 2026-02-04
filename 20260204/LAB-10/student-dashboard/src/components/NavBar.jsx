import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span className="brand-icon">🎓</span>
                <h1>Student Dashboard</h1>
            </div>
            <ul className="nav-links">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        end
                    >
                        <span className="nav-icon">📊</span>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/courses"
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                        <span className="nav-icon">📚</span>
                        Courses
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                        <span className="nav-icon">👤</span>
                        Profile
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
