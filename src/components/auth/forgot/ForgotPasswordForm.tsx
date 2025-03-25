// src/components/auth/forgot/ForgotPasswordForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/API";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await api.post('/v1/reset/password-reset', {
        email: email,
      });
    console.log("Email para recuperação:", email);
    console.log("Enviando email de recuperação...", response.data.message);
    navigate('/login');
    } catch (err: any) {
      console.error("Erro ao enviar email:", err);
      setError("Erro ao enviar email. Verifique seu email cadastrado.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-container">
        <h1 className="text-logo">UFRA</h1>
        <h2 className="title">AUTENTICAÇÃO</h2>
      </div>

      <div className="form-group-login">
        <label htmlFor="email">Digite seu email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="form-group-login button-group">
        <button type="submit" className="login-button">
          ENVIAR
        </button>
        <a href="/login" className="auth-link">
          Voltar para o Login
        </a>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;