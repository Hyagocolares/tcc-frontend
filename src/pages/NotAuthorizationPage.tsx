// src/
import React, { useState } from 'react'

import '../../styles/request/RequestPage.css'

import Sidebar from '../components/home/sidebar/Siderbar';
import Header from '../components/home/header/Header';

const NotAuthorizationPage: React.FC = () => {
        const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
    
        const toggleSidebar = () => {
            setSidebarCollapsed(!sidebarCollapsed)
        }

    return (
        <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className="container-main">
                <Header />

                <div>
                    <h2>Acesso nao autorizado!</h2>
                </div>
            </div>
        </div>
    );
};

export default NotAuthorizationPage;