// src/components/RegisterForm.tsx
import React, { useState } from "react";
import './RegisterForm.css';

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você poderá integrar a chamada à API para cadastro
    console.log("Dados para cadastro:", formData);
  };

  return (
    <div className="w-96 p-6 bg-white rounded-xl shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Nome de usuário:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Digite seu nome de usuário"
            className="w-full p-2 border rounded-md"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu email"
            className="w-full p-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            className="w-full p-2 border rounded-md"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirmar Senha:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            className="w-full p-2 border rounded-md"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};
