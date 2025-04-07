// src/pages/requestDetails/RequestDetailPage.tsx
import React, { useState } from 'react'
import '../../styles/request/RequestPage.css'

import Sidebar from '../../components/home/sidebar/Siderbar';
import Header from '../../components/home/header/Header';
import RequestDetails from '../../components/requestDetails/RequestDetails';

const RequestDetailPage: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    return (
        <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className="container-main">
                <Header />
                <RequestDetails />
            </div>
        </div>
    );
};

export default RequestDetailPage;