// src/pages/home/HomePage.tsx
import React, { useState } from 'react'
import Header from '../../components/home/header/Header'
import Sidebar from '../../components/home/sidebar/Siderbar'
import MainHome from '../../components/home/main/MainHome'

import '../../styles/home/HomePage.css'

const HomePage: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

    const toggleSidebar = () => {
      setSidebarCollapsed(!sidebarCollapsed)

    }

  return (
    <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      <Sidebar  collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />

      <div className="container-main">
        <Header />
        <MainHome />
      </div>
    </div>
  )
}

export default HomePage