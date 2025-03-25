// src/router.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/registerLogin/RegisterPage";
import ForgotPasswordPage from "./pages/forgotLogin/ForgotPasswordPage";
import HomePage from "./pages/home/HomePage"
import RequestPage from "./pages/request/ResquestPage";
import CalendarPage from "./pages/calendar/CalendarPage";
import SettingsPage from "./pages/settings/SettingsPage";
import ProtectedRoute from "./utils/ProtectedRoute"
import ReportPage from "./pages/report/ReportPage";
import RequestListPage from "./pages/requestList/RequestListPage";
import ResetPasswordPage from "./pages/resetPassword/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import RequestStatusPage from "./pages/RequestStatus/RequestStatusPage";


const RouterApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/register"
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          } />

        <Route path="/reset-password"
          element={
            // <ProtectedRoute>
            <ResetPasswordPage />
            // </ProtectedRoute>
          } />

        <Route path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />

        <Route path="/new-request"
          element={
            <ProtectedRoute>
              <RequestPage />
            </ProtectedRoute>
          } />

        <Route path="/new-request/:id"
          element={
            <ProtectedRoute>
              <RequestPage />
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
              <RequestStatusPage />
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


        <Route path="*" element={<NotFoundPage />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
