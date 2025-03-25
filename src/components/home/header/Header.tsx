// src/components/home/header/Header.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../../styles/home/Header.css'

const Header: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="header-ufra">
            <img className="logo-placeholder-ufra" src="https://novo.ufra.edu.br/images/images/brasao-ufra-2017.png" alt="Logo da UFRA" />
            <h1 className="header-title-ufra">UFRA</h1>
            <button className="logout-button-ufra" onClick={handleLogout}>
                Sair
            </button>
        </header>
    )
}

export default Header