// src/utils/ProtectedRoute.tsx
import React from "react"
import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  exp: number
}

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token")

  // if (!token) {
  //   return <Navigate to="/login" />
  // }

  // try {
  //   const decoded = jwtDecode<DecodedToken>(token)

  //   if (decoded.exp * 1000 < Date.now()) {
  //     localStorage.removeItem("token")
  //     return <Navigate to="/login" />
  //   }

  // } catch (error) {
  //   localStorage.removeItem("token")
  //   return <Navigate to="/login" />
  // }

  return children
}



export default ProtectedRoute
