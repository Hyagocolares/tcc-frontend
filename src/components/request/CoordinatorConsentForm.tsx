// src/components/request/CoordinatorConsentForm.tsx
import React, { useState } from 'react'
import api from '../../utils/API'
import "./RequestForm.css"

import { IRequestConsent } from '../../interfaces/IRequest'
import { IRequestStatus } from '../../interfaces/IRequestStatus'

import CoordinatorConsentsForm, { createCoordinatorConsentItem } from './forms/CoordinatorConsentsForm'
import { ICleanCoordinatorConsent, ICoordinatorConsent } from '../../interfaces/ICoordinatorConsent'
import { useNavigate, useParams } from 'react-router-dom'
import { clearCache } from '../../utils/debouncedUpdateTeachers'

const CoordinatorConsentForm: React.FC = () => {
  const [consentsCoordinator, setConsentsCoordinator] = useState<ICoordinatorConsent[]>([createCoordinatorConsentItem()])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const handleSubmit = async () => {
    const cleanCoordinatorConsents: ICleanCoordinatorConsent[] = consentsCoordinator.map(() => ({
      opinion: consentsCoordinator[0].opinion,
      status: IRequestStatus.PENDINGC
    }));

    console.log('Consents Coordinator:', cleanCoordinatorConsents);

    const requestData: IRequestConsent = {
      status: IRequestStatus.PENDINGC,
      coordinatorConsents: cleanCoordinatorConsents,
      updatedAt: new Date()
    }

    console.log('Formulário enviado! : ' + JSON.stringify(requestData, null, 2))

    try {
      if (!id) {
        throw new Error('ID do request não encontrado nos parâmetros da URL.');
      }

      const responseRequests = await api.put(`/v1/request/${id}`, requestData);

      console.log('Resposta do backend:', responseRequests.data);

      alert('Dados enviados com sucesso!');
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

  return (
    <div className="request-form-container">
      <form className="request-form" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
        <div className="request-form-column">
          <div className="request-form-group">
            <CoordinatorConsentsForm
              consents={consentsCoordinator}
              setConsents={setConsentsCoordinator} />
          </div>
        </div>
        <button type="submit" className="request-next-button">
          → Criar
        </button>
      </form>
    </div>
  )
}

export default CoordinatorConsentForm