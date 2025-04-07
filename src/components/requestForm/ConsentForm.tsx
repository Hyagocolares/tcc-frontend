// src/components/request/ConsentForm.tsx
import React, { useState, useEffect } from 'react';
import api from '../../utils/API';
import "./RequestForm.css";

import { IRequestConsent } from '../../interfaces/IRequest';
import { IRequestStatus } from '../../interfaces/IRequestStatus';
import { useNavigate } from 'react-router-dom';
import { clearCache } from '../../utils/debouncedUpdateTeachers';
import ConsentsForm, { createConsentItem } from './forms/ConsentsForm';
import { IConsent, ICleanConsent } from '../../interfaces/IConsent';

interface ConsentFormProps {
  role: 'DIRECTOR' | 'COORDINATOR';
}

const ConsentForm: React.FC<ConsentFormProps> = ({ role }) => {
  const [consents, setConsents] = useState<IConsent[]>([createConsentItem()]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`${role} Consent Form Loaded`);
  }, [role]);

  const handleSubmit = async () => {
    const cleanConsents: ICleanConsent[] = consents.map(({ id, ...rest }) => rest);

    console.log(`${role} Consents:`, cleanConsents);

    const requestData: IRequestConsent = {
      status: role === 'DIRECTOR' ? IRequestStatus.APPROVED : IRequestStatus.PENDINGC,
      [`${role.toLowerCase()}Consents`]: cleanConsents,
      updatedAt: new Date()
    };

    console.log('Payload enviado:', JSON.stringify(requestData, null, 2));

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const requestId = urlParams.get('id');

      if (!requestId) {
        throw new Error('ID do request não encontrado nos parâmetros da URL.');
      }

      const responseRequests = await api.put(`/v1/request/${requestId}`, requestData);
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
  };

  return (
    <div className="request-form-container">
      <form className="request-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="request-form-column">
          <div className="request-form-group">
            <ConsentsForm consents={consents} setConsents={setConsents} role={role} />
          </div>
        </div>
        <button type="submit" className="request-next-button">
          → Criar
        </button>
      </form>
    </div>
  );
};

export default ConsentForm;
