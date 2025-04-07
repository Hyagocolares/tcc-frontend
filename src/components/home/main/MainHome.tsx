// src/components/home/main/MainHome.tsx
import React from 'react'
import '../../../styles/home/MainHome.css'
import { getUserRole } from '../../../utils/accessControl';

const MainHome: React.FC = () => {

  const userRole = getUserRole();

  return (
    <main className="main-content">
      <div className="central-logo">
        <div className="ufra-logo-placeholder">
          <img className="logo-text" src="https://iconape.com/wp-content/files/bs/194866/png/194866.png" alt="Logo da UFRA" />
        </div>
      </div>

      <div className="action-buttons">
        {userRole === 'Teacher' && (
          <a href="request/new-request" className="primary-button-a">
            <button className="primary-button">
              <i className="material-icons">add</i>
              <span>Novo requerimento</span>
            </button>
          </a>
        )}

        {userRole === 'Teacher' && (
          <a href="/request" className="secondary-button-a">
            <button className="secondary-button">
              <i className="material-icons">list</i>
              <span>Meus requerimentos</span>
            </button>
          </a>
        )}

        {userRole === 'Director' && (
          <a href="/request" className="secondary-button-a">
            <button className="secondary-button">
              <i className="material-icons">list</i>
              <span>Requerimentos</span>
            </button>
          </a>
        )}

        {false && (
          <a href="/status-request" className="secondary-button-a">
            <button className="secondary-button">
              <i className="material-icons">hourglass_empty</i>
              <span>Requerimentos mencionados</span>
            </button>
          </a>
        )}
      </div>

    </main>
  )
}

export default MainHome
