// src/components/home/sidebar/Siderbar.tsx
import React from 'react'
import { Link } from 'react-router-dom';
import '../../../styles/home/Sidebar.css'

import { getUserRole } from '../../../utils/accessControl';

interface SidebarProps {
    collapsed: boolean
    toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {

    const userRole = getUserRole();

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {collapsed ? <span className="material-icons">
                    menu
                </span> : <span className="material-icons">
                    menu_open
                </span>}
            </button>

            <nav>
                <ul className="menu">
                    <li>
                        <Link
                            to="/"
                            className="menu-item"
                            onClick={(e) => {
                                e.preventDefault();
                                setTimeout(() => {
                                    window.location.href = "/";
                                }, 500);
                            }}
                        >
                            <i className="material-icons">home</i>
                            <span className="menu-text">Home</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/calendar"
                            className="menu-item"
                            onClick={(e) => {
                                e.preventDefault();
                                setTimeout(() => {
                                    window.location.href = "/calendar";
                                }, 500);
                            }}
                        >
                            <i className="material-icons">date_range</i>
                            <span className="menu-text">Calendário</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/request"
                            className="menu-item"
                            onClick={(e) => {
                                e.preventDefault();
                                setTimeout(() => {
                                    window.location.href = "/request";
                                }, 500);
                            }}
                        >
                            <i className="material-icons">assignment</i>
                            <span className="menu-text">Requerimento</span>
                        </Link>
                    </li>

                    {userRole === 'Director' && (
                        <li>
                            <Link
                                to="/registrations"
                                className="menu-item"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTimeout(() => {
                                        window.location.href = "/registrations";
                                    }, 500);
                                }}
                            >
                                <i className="material-icons">group_add</i>
                                <span className="menu-text">cadastro</span>
                            </Link>
                        </li>
                    )}

                    {false && (
                        <li>
                            <Link
                                to="/report"
                                className="menu-item"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTimeout(() => {
                                        window.location.href = "/report";
                                    }, 500);
                                }}
                            >
                                <i className="material-icons">report</i>
                                <span className="menu-text">Relatorio</span>
                            </Link>
                        </li>
                    )}

                    {false && (
                    <li>
                        <Link
                            to="/settings"
                            className="menu-item"
                            onClick={(e) => {
                                e.preventDefault();
                                setTimeout(() => {
                                    window.location.href = "/settings";
                                }, 500);
                            }}
                        >
                            <i className="material-icons">settings</i>
                            <span className="menu-text">Configurações</span>
                        </Link>
                    </li>
                    )}

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
