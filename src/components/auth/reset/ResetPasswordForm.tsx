// src/components/auth/forgot/ForgotPasswordForm.tsx
import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import api from "../../../utils/API"

const ResetPasswordForm: React.FC = () => {
    const [password, setPassword] = useState("")
    const [passwordTwo, setPasswordTwo] = useState("")
    const [error, setError] = useState("")
    const [token, setToken] = useState("")

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const tokenParam = searchParams.get("token")
        if (tokenParam) {
            setToken(tokenParam)
        } else {
            setError("Token inválido ou ausente.")
        }
    }, [location])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== passwordTwo) {
            setError("Senhas diferentes.")
            return
        }

        if (!token) {
            setError("Token inválido ou ausente.")
            return
        }

        try {
            const response = await api.post('/v1/reset/', {
                token,
                newPassword: password,
            })
            console.log("Senha atualizada com sucesso:", response.data.message)
            navigate('/login')
        } catch (err: any) {
            console.error("Erro ao atualizar a senha:", err)
            setError("Erro ao atualizar a senha. Tente novamente.")
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-container">
                <h1 className="text-logo">UFRA</h1>
                <h2 className="title">AUTENTICAÇÃO</h2>
            </div>

            <div className="form-group-login">
                <label htmlFor="password">Nova senha:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Digite sua nova senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="form-group-login">
                <label htmlFor="passwordTwo">Repita a senha:</label>
                <input
                    type="password"
                    id="passwordTwo"
                    placeholder="Digite sua senha novamente"
                    value={passwordTwo}
                    onChange={(e) => setPasswordTwo(e.target.value)}
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
    )
}

export default ResetPasswordForm