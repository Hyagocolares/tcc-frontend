// src/
import React, { useState } from 'react'
import '../../styles/request/RequestPage.css'
import Sidebar from '../../components/home/sidebar/Siderbar';
import Header from '../../components/home/header/Header';
import RequestList from '../../components/requestlist/RequestList';


const RequestListPage: React.FC = () => {
        const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
    
        const toggleSidebar = () => {
            setSidebarCollapsed(!sidebarCollapsed)
        }

    return (
        <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className="container-main">
                <Header />
                <RequestList />
            </div>
        </div>
    );
};

export default RequestListPage;