// src/components/new/RequestList.tsx
import React, { useEffect, useState } from 'react';
import RequestListGeneric, { Request } from './RequestListGeneric';
import './RequestList.css'
import api from '../../utils/API';
import { clearCache } from '../../utils/debouncedUpdateTeachers';
import { jwtDecode } from 'jwt-decode';

const RequestList: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  interface DecodedToken {
    id: number
    email: string
    category: string
    iat: number
    exp: number
  }

  const renderActions = (req: Request) => (
    <>
      {(req.status === 'Rascunho' || req.status === 'Em andamento' || req.status === 'Pendente') && (
        <>
          <button onClick={() => window.location.href = `/request/new-request/${req.id}`}>Edit</button>
          <button className="btn-delete" onClick={async () => {
            try {
              await api.delete(`/v1/requests/${req.id}`);
              alert('Deletado com sucesso!');
              setRefreshKey(prev => prev + 1); // Atualiza a lista
            } catch (error) {
              alert('Erro ao deletar o requerimento');
            }
          }}>Delete</button>
        </>
      )}
      {
        (req.status === 'Aprovado' || req.status === 'Rejeitado') && (
          <>
            <button className="btn-view" onClick={() => window.location.href = `/request/${req.id}`}>Visualizar </button>
          </>
        )
      }

    </>
  );

  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token não encontrado');
  const decoded = jwtDecode<DecodedToken>(token);
  const userId = decoded.id;

  useEffect(() => {
    clearCache()
  }, [])

  return (
    <RequestListGeneric
      key={refreshKey}
      title="Lista de Requerimentos"
      dataFetchUrl={`/v1/requests/paginated/${userId}`}
      renderActions={renderActions}
    />
  );
};

export default RequestList;
