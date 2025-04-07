// src/router.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./utils/ProtectedRoute";

import LoginPage from "./pages/auth/login/LoginPage";
import ForgotPasswordPage from "./pages/auth/forgot/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/reset/ResetPasswordPage";
import RegisterPage from "./pages/auth/register/RegisterPage";
import HomePage from "./pages/home/HomePage";
import RequestPage from "./pages/request/RequestPage";
import RequestDetailPage from "./pages/requestDetails/RequestDetailPage";
import RegistrationsPage from "./pages/registrations/RegistrationsPage";
import CalendarPage from "./pages/calendar/CalendarPage";
import SettingsPage from "./pages/settings/SettingsPage";
import ReportPage from "./pages/report/ReportPage";
import NotFoundPage from "./pages/NotFoundPage";
import RequestListPage from "./pages/requestList/RequestListPage";

import CoordinatorConsentForm from "./components/request/CoordinatorConsentForm";
// import RequestListCoordinatorConsent from "./components/new/coordinator/RequestListCoordinatorConsent";
// import RequestListDirectorConsent from "./components/new/director/RequestListDirectorConsent";

import RequestForm from "./components/requestForm/RequestForm";
import DirectorConsentForm from "./components/request/DirectorConsentForm";
import RegisterUser from "./components/registrations/RegisterUser";
import RegisterDiscipline from "./components/registrations/RegisterDiscipline";
import RegisterCourse from "./components/registrations/RegisterCourse";

const RouterApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/register"
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          } />

        <Route path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />

        <Route path="/request"
          element={
            <ProtectedRoute>
              <RequestListPage />
            </ProtectedRoute>
          } />

        <Route path="/request/:id"
          element={
            <ProtectedRoute>
              <RequestDetailPage />
            </ProtectedRoute>
          } />

        <Route path="/request/new-request"
          element={
            <ProtectedRoute>
              <RequestPage />
            </ProtectedRoute>
          } />

        <Route path="/request/new-request/:id"
          element={
            <ProtectedRoute>
              <RequestPage />
            </ProtectedRoute>
          } />

        <Route path="/request/consent-coordinator/:id"
          element={
            <ProtectedRoute>
              <CoordinatorConsentForm />
            </ProtectedRoute>
          } />

        <Route path="/request/consent-director/:id"
          element={
            <ProtectedRoute>
              <DirectorConsentForm />
            </ProtectedRoute>
          } />

        <Route path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          } />

        <Route path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />

        <Route path="/report"
          element={
            <ProtectedRoute>
              <ReportPage />
            </ProtectedRoute>
          } />

        <Route path="/registrations"
          element={
            <ProtectedRoute>
              <RegistrationsPage />
            </ProtectedRoute>
          } />

        <Route path="/register-user"
          element={
            <ProtectedRoute>
              <RegisterUser />
            </ProtectedRoute>
          } />

        <Route path="/edit-user/:id"
          element={
            <ProtectedRoute>
              <RegisterUser />
            </ProtectedRoute>
          } />

        <Route path="/register-discipline"
          element={
            <ProtectedRoute>
              <RegisterDiscipline />
            </ProtectedRoute>
          } />

        <Route path="/edit-discipline/:id"
          element={
            <ProtectedRoute>
              <RegisterDiscipline />
            </ProtectedRoute>
          } />

        <Route path="/register-course"
          element={
            <ProtectedRoute>
              <RegisterCourse />
            </ProtectedRoute>
          } />

        <Route path="/edit-course/:id"
          element={
            <ProtectedRoute>
              <RegisterCourse />
            </ProtectedRoute>
          } />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
