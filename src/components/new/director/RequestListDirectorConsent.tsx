// src/components/new/director/RequestListDirectorConsent.tsx
import React from 'react';
import RequestListGeneric, { Request } from '../RequestListGeneric';
import '../RequestList.css'
import { useNavigate } from 'react-router-dom';

const RequestListDirectorConsent: React.FC = () => {
  const navigate = useNavigate();
  
  const renderActions = (req: Request) => (
    <button onClick={() => navigate(`/request/consent-director/${req.id}`)}>Edit</button>
  );

  return (
    <RequestListGeneric
      title="Lista de Requerimentos Director"
      dataFetchUrl="/v1/requests/paginated"
      renderActions={renderActions}
    />
  );
};

export default RequestListDirectorConsent;
