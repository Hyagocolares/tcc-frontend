// src/components/request/DirectorConsentForm.tsx
import React, { useState, ChangeEvent } from 'react'
import api from '../../utils/API'
import "./RequestForm.css"

import { IRequestStatus } from '../../interfaces/IRequestStatus'

import { ICleanDirectorConsent, IDirectorConsent } from '../../interfaces/IDirectorConsent'
import { useNavigate, useParams } from 'react-router-dom'
import { clearCache } from '../../utils/debouncedUpdateTeachers'

import Sidebar from '../home/sidebar/Siderbar'
import Header from '../home/header/Header'

export const createDirectorConsentItem = (): IDirectorConsent => ({
  id: Date.now(),
  opinion: '',
  request: { id: 0 },
  createdAt: new Date()
})

const DirectorConsentForm: React.FC = () => {
  const [consentsDirector, setConsentsDirector] = useState<IDirectorConsent[]>([createDirectorConsentItem()])
  const [status, setStatus] = useState<IRequestStatus>(IRequestStatus.APPROVED)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const handleSubmit = async () => {
    const cleanDirectorConsents: ICleanDirectorConsent[] = consentsDirector.map(({ id, ...rest }) => rest);

    try {
      if (!id) {
        throw new Error('ID do request não encontrado nos parâmetros da URL.');
      }

      // Enviar para a rota correta de consentimento de diretor
      const response = await api.post(`/v1/consents/director/${id}`, {
        opinion: cleanDirectorConsents[0].opinion,
        status: status
      });

      console.log('Resposta do backend:', response.data);

      alert(`Solicitação ${status === IRequestStatus.APPROVED ? 'aprovada' : 'rejeitada'} com sucesso!`);
      clearCache();
      navigate('/request');

    } catch (error: any) {
      console.error('Erro ao enviar requisição:', error);

      if (error.response?.status === 401) {
        alert('Sessão expirada. Faça login novamente.');
        window.location.href = '/login';
      }
    }
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="container-main">
        <Header />
        <div className="request-form-container">
          <form className="request-form" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
            <div className="request-form-column">
              <h2>8 - Consentimento do Diretor</h2>
              <div className="request-form-group">
                <div className="form-group input-group">
                  <label htmlFor="opinion">Opinião:</label>
                  <input
                    id="opinion"
                    type="text"
                    name="opinion"
                    placeholder="insira sua opinião"
                    value={consentsDirector[0].opinion}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setConsentsDirector(prev => [{ ...prev[0], opinion: e.target.value }])
                    }
                  />
                </div>
              </div>

              <div className="request-form-group">
                <h3>Decisão Final</h3>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value={IRequestStatus.APPROVED}
                      checked={status === IRequestStatus.APPROVED}
                      onChange={() => setStatus(IRequestStatus.APPROVED)}
                    />
                    Aprovar Solicitação
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value={IRequestStatus.REJECTED}
                      checked={status === IRequestStatus.REJECTED}
                      onChange={() => setStatus(IRequestStatus.REJECTED)}
                    />
                    Rejeitar Solicitação
                  </label>
                </div>
              </div>
            </div>
            <button type="submit" className="request-next-button">
              → Enviar Decisão
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DirectorConsentForm