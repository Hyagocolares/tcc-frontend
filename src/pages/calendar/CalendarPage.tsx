// src/pages/calendar/CalendarPage.tsx
import React, { useState } from 'react'
import '../../styles/request/RequestPage.css'

import Header from '../../components/home/header/Header'
import Sidebar from '../../components/home/sidebar/Siderbar'
import Calendar from '../../components/calendar/Calendar.tsx'


const CalendarPage: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    return (
        <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className="container-main">
                <Header />
                <Calendar />
            </div>
        </div>
    )
}

export default CalendarPage
