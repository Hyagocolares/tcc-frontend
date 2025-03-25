// src/components/auth/login/LoginForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/API";
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post('/v1/auths/login', {
        email: email,
        password: password,
      });
      console.log("Login realizado com sucesso:", response.data);
      localStorage.setItem('token', response.data.token);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/');
    } catch (err: any) {
      console.error("Erro ao realizar login:", err);
      setError("Erro ao realizar login. Verifique suas credenciais.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-container">
        <h1 className="text-logo">UFRA</h1>
        <h2 className="title">AUTENTICAÇÃO</h2>
      </div>

      <div className="form-group-login">
        <label htmlFor="email">Email de usuário:</label>
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

      <div className="form-group-login">
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="form-group-login button-group">
        <button type="submit" className="login-button">
          ENTRAR
        </button>
        <a href="/forgot-password" className="auth-link">
          Esqueceu a senha?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;