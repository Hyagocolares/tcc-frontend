// src/pages/ForgotPasswordPage.tsx
import React from "react"
import ResetPasswordForm from "../../../components/auth/reset/ResetPasswordForm.tsx"

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="login-page">
      <header className="header-login">
        <img className="university-logo" src="https://autenticacao.ufra.edu.br/sso-server/images/ufrn-logo.png" alt="Logo da UFRA" />
        <h1 className="university-title">
          UNIVERSIDADE FEDERAL RURAL DA AMAZÔNIA
        </h1>
      </header>
      <div className="login-container-main">
        <main className="form-container">
          <ResetPasswordForm />
        </main>
      </div>
    </div>
  )
}

export default ResetPasswordPage