// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { RegisterForm } from "../../../components/auth/register/RegisterForm.tsx";
import Header from "../../../components/home/header/Header.tsx";
import Sidebar from "../../../components/home/sidebar/Siderbar.tsx";

const RegisterPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }
  return (
    <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="container-main">
        <Header />
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
