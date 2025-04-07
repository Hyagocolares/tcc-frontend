// src/utils/ProtectedRoute.tsx
import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  id: number
  email: string
  category: string
  iat: number
  exp: number
}

interface ProtectedRouteProps {
  children: JSX.Element
}

export const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" />
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token)

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token")
      return <Navigate to="/login" />
    }

  } catch (error) {
    localStorage.removeItem("token")
    return <Navigate to="/login" />
  }

  return children
}

export const ProtectedRouter: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const [remainingTime, setRemainingTime] = useState<number>(0)

  const token = localStorage.getItem("token")
  let decoded: DecodedToken | null = null
  if (token) {
    try {
      decoded = jwtDecode<DecodedToken>(token)
    } catch (error) {
      decoded = null
    }
  }

  useEffect(() => {
    if (!token || !decoded) {
      setIsAuthorized(false)
      return
    }

    const expirationTime = decoded.exp * 1000

    const updateRemainingTime = () => {
      const timeLeft = expirationTime - Date.now()
      if (timeLeft <= 0) {
        setIsAuthorized(false)
      } else {
        setRemainingTime(timeLeft)
        setIsAuthorized(true)
      }
    }

    updateRemainingTime()
    const timer = setInterval(updateRemainingTime, 1000)

    return () => clearInterval(timer)
  }, [token, decoded])

  if (!isAuthorized) {
    localStorage.removeItem("token")
    return <Navigate to="/login" />
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "100px",
          padding: "5px",
          background: "#eee",
          zIndex: 1000
        }}
      >
        Tempo restante: {Math.floor(remainingTime / 1000)} segundos
      </div>
      {children}
    </>
  )
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [remainingTime, setRemainingTime] = useState<number>(0)

  const token = localStorage.getItem("token")
  let decoded: DecodedToken | null = null
  if (token) {
    try {
      decoded = jwtDecode<DecodedToken>(token)
    } catch (error) {
      decoded = null
    }
  }

  useEffect(() => {
    if (!token || !decoded) {
      setIsAuthorized(false)
      return
    }

    const expirationTime = decoded.exp * 1000

    const updateRemainingTime = () => {
      const timeLeft = expirationTime - Date.now()
      if (timeLeft <= 0) {
        setIsAuthorized(false)
      } else {
        setRemainingTime(timeLeft)
        setIsAuthorized(true)
      }
    }

    updateRemainingTime()
    const timer = setInterval(updateRemainingTime, 1000)

    return () => clearInterval(timer)
  }, [token, decoded])

  if (isAuthorized === null) {
    return <div>Carregando...</div>
  }

  if (!isAuthorized) {
    localStorage.removeItem("token")
    return <Navigate to="/login" />
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "15px",
          right: "200px",
          padding: "5px",
          // background: "#333",
          color: "#fff",
          zIndex: "2",
        }}
      >
        Tempo de Sessão: {new Date(remainingTime).toISOString().substr(14, 5)}
      </div>
      {children}
    </>
  )
}
