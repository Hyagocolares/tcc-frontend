// RequestPage.tsx
import React, { useState } from 'react'
// import './RequestForm.css'
import '../../styles/request/RequestPage.css'

import Header from '../../components/home/header/Header'
import Sidebar from '../../components/home/sidebar/Siderbar'
import RequestForm from '../../components/request/RequestForm'

const RequestPage: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    return (
        <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className="container-main">
                <Header />
                <RequestForm />
            </div>
        </div>
    )
}

export default RequestPage