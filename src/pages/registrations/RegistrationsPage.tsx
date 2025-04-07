// src/pages/registrations/RegistrationsPage.tsx
import React, { useState } from 'react'
import '../../styles/dashboard/RegistrationsPage.css'

import Sidebar from '../../components/home/sidebar/Siderbar';
import Header from '../../components/home/header/Header';
import Dashboard from '../../components/registrations/Dashboard';


const ReportPage: React.FC = () => {
        const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
    
        const toggleSidebar = () => {
            setSidebarCollapsed(!sidebarCollapsed)
        }

    return (
        <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className="container-main">
                <Header />
                <div className='registrations-container'>
                  <Dashboard />
                </div>
            </div>
        </div>
    );
};

export default ReportPage;
