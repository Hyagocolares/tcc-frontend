// src/
import React, { useState } from 'react'

import '../../styles/request/RequestPage.css'

import Sidebar from '../../components/home/sidebar/Siderbar';
import Header from '../../components/home/header/Header';

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

                O relatorio principal e a das requests, queremos saber para cada request filtro por semana, mes e semestre e ano. 
                Alguns campos da request serao processado e catalogados aqui.
                Listados como individual e calculados e catalogados como total.

            </div>
        </div>
    );
};

export default ReportPage;