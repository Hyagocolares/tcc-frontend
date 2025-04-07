// src/components/new/coordinator/RequestListCoordinatorConsent.tsx
import React from 'react';
import RequestListGeneric, { Request } from '../RequestListGeneric';
import '../RequestList.css'
import { useNavigate } from 'react-router-dom';

const RequestListCoordinatorConsent: React.FC = () => {
  const navigate = useNavigate();
  
  const renderActions = (req: Request) => (
    <button onClick={() => navigate(`/request/consent-coordinator/${req.id}`)}>Edit</button>
  );

  return (
    <RequestListGeneric
      title="Lista de Requerimentos Coordinator"
      dataFetchUrl="/v1/requests/paginated"
      renderActions={renderActions}
    />
  );
};

export default RequestListCoordinatorConsent;
