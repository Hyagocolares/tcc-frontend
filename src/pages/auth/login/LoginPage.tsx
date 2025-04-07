// src/pages/LoginPage.tsx
import React from "react"
import LoginForm from "../../../components/auth/login/LoginForm"
import "./LoginPage.css"

const LoginPage: React.FC = () => {
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
          <LoginForm />
        </main>
      </div>
    </div>
  )
}

export default LoginPage