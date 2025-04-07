// src/pages/requestList/RequestListPage.tsx
import React, { useState } from 'react'
import '../../styles/request/RequestPage.css'
import Sidebar from '../../components/home/sidebar/Siderbar';
import Header from '../../components/home/header/Header';
import RequestList from '../../components/new/RequestList';
import RequestListCoordinatorConsent from '../../components/new/coordinator/RequestListCoordinatorConsent';
import RequestListDirectorConsent from '../../components/new/director/RequestListDirectorConsent';
import { getUserRole } from '../../utils/accessControl';

const RequestListPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const userRole = getUserRole();


  return (
    <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="container-main">
        <Header />
        <div className="table-list">
          {userRole === 'Teacher' && (
            <RequestList />
          )}

          {userRole === 'Coordinator' && (
            <RequestListCoordinatorConsent />
          )}

          {userRole === 'Director' && (
            <RequestListDirectorConsent />
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestListPage;