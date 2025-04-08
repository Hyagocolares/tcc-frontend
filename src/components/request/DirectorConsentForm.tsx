// src/components/request/DirectorConsentForm.tsx
import React, { useState, ChangeEvent, useEffect } from 'react'
import api from '../../utils/API'
import "./RequestForm.css"

import { IRequestStatus } from '../../interfaces/IRequestStatus'

import { ICleanDirectorConsent, IDirectorConsent } from '../../interfaces/IDirectorConsent'
import { useNavigate, useParams } from 'react-router-dom'
import { clearCache } from '../../utils/debouncedUpdateTeachers'

import Sidebar from '../home/sidebar/Siderbar'
import Header from '../home/header/Header'
import { jwtDecode } from 'jwt-decode'

export const createDirectorConsentItem = (): IDirectorConsent => ({
  id: Date.now(),
  opinion: '',
  userDirector: { id: 0 },
  request: { id: 0 },
  createdAt: new Date()
})

interface DecodedToken {
  id: number
  email: string
  category: string
  iat: number
  exp: number
}

const DirectorConsentForm: React.FC = () => {
  const [consentsDirector, setConsentsDirector] = useState<IDirectorConsent[]>([createDirectorConsentItem()])
  const [status, setStatus] = useState<IRequestStatus>(IRequestStatus.APPROVED)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [userId, setUserId] = useState<number | null>(null)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token não encontrado');

        const decoded = jwtDecode<DecodedToken>(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
      }
    };

    const checkExistingConsent = async () => {
      try {
        if (!id) return;

        console.log('Verificando se já existe um consentimento para a solicitação:', id);
        const response = await api.get(`/v1/consents/director/request/${id}`);

        if (response.data.consent) {
          console.log('Já existe um consentimento para esta solicitação:', response.data.consent);
          alert('Já existe um consentimento para esta solicitação. Você não pode criar outro.');
          navigate('/request');
        }
      } catch (error: any) {
        // Se o erro for 404, significa que não existe um consentimento, o que é o comportamento esperado
        if (error.response?.status !== 404) {
          console.error('Erro ao verificar consentimento existente:', error);
        }
      }
    };

    fetchUserData();
    checkExistingConsent();
  }, [id, navigate]);

  console.log('👤 userId --: ', userId)
  console.log('🔍 requestId --: ', id)

  const handleSubmit = async () => {
    try {
      if (!id) {
        throw new Error('ID do request não encontrado nos parâmetros da URL.');
      }

      if (!userId) {
        throw new Error('ID do usuário não encontrado.');
      }

      console.log('Enviando requisição para:', `/v1/consents/director/${id}`);
      const payload = {
        opinion: consentsDirector[0].opinion,
        status: status === IRequestStatus.APPROVED ? 'Aprovado' : 'Rejeitado',
        userId: userId,
        accepted: status === IRequestStatus.APPROVED
      };
      console.log('Payload:', payload);

      // Enviar para a rota correta de consentimento de diretor
      const response = await api.post(`/v1/consents/director/${id}`, payload);

      console.log('Resposta do backend:', response.data);

      // Verificar se já existe um consentimento
      if (response.status === 409) {
        alert('Já existe um consentimento para esta solicitação.');
        navigate('/request');
        return;
      }

      alert(`Solicitação ${status === IRequestStatus.APPROVED ? 'aprovada' : 'rejeitada'} com sucesso!`);
      clearCache();
      navigate('/request');
    } catch (error: any) {
      console.error('Erro ao enviar requisição:', error);

      // Exibir detalhes adicionais do erro
      if (error.response) {
        console.error('Detalhes do erro:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
        
        // Exibir mensagem de erro mais detalhada para o usuário
        if (error.response.data && error.response.data.error) {
          alert(`Erro ao enviar requisição: ${error.response.data.error}`);
        } else {
          alert(`Erro ao enviar requisição: ${error.response.status} - ${error.response.statusText}`);
        }
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
        alert('Erro na requisição: Não foi possível conectar ao servidor');
      } else {
        console.error('Erro:', error.message);
        alert(`Erro: ${error.message}`);
      }

      if (error.response?.status === 401) {
        alert('Sessão expirada. Faça login novamente.');
        window.location.href = '/login';
      } else if (error.response?.status === 409) {
        alert('Já existe um consentimento para esta solicitação.');
        navigate('/request');
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