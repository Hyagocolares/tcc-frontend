// src/components/requestlist/RequestListGeneric.tsx
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import api from '../../utils/API';
import { getCourses } from '../../utils/debouncedUpdateTeachers';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../../utils/accessControl';

export interface Request {
  id: number;
  date: string;
  status: 'Rascunho' | 'Em andamento' | 'Pendente' | 'Aprovado' | 'Rejeitado';
  title: string;
  name?: string;
  curso?: string
}

interface Course {
  id: number
  name: string
}

interface RequestListGenericProps {
  title: string;
  dataFetchUrl: string;
  renderActions?: (req: Request) => React.ReactNode;
}

const RequestListGeneric: React.FC<RequestListGenericProps> = ({
  title,
  dataFetchUrl,
  renderActions,
}) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [courses, setCourses] = useState<Course[]>([])
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterCourse, setFilterCourse] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Request; direction: 'asc' | 'desc' } | null>(null);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const userRole = getUserRole();

  if (loading) {
    setTimeout(() => setLoading(false), 500)
}

  const formatData = (data: any[]): Request[] => {
    return data.map((item) => ({
      id: item.id,
      date: item.createdAt.split('T')[0],
      status: item.status,
      title: item.subjects?.[0]?.subject?.name || 'Disciplina não informado',
      name: item.user?.name || 'Sem usuário',
      curso: item.subjects?.[0]?.subject?.courses?.[0]?.name || 'Sem curso',
    }));
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get(dataFetchUrl);
        if (response.data && response.data.formattedRequests) {
          const formattedData = formatData(response.data.formattedRequests);
          console.log('Formatted data:', formattedData);
          setRequests(formattedData);
        } else {
          console.error('Resposta da API não contém "data.formattedRequests".', response);
        }
      } catch (error: any) {
        console.error('Erro ao buscar requerimentos i:', error);
        if (error.response?.status === 401) {
          alert('Sessão expirada. Faça login novamente.');
          window.location.href = '/login';
        } else {
          alert(`Erro ${error.response?.status}: ${error.response?.data?.message || 'Erro ao buscar requerimentos.'}`) //Retirar
        }
      }
    };

    fetchRequests();
  }, [dataFetchUrl]);

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const response = await getCourses()
        console.log('Courses response:', response)
        if (Array.isArray(response.courses)) {
          setCourses(response.courses || [])
        } else if (response.courses && Array.isArray(response.courses)) {
          setCourses(response.courses || [])
        } else {
          setCourses([])
        }
      } catch (error) {
        console.error('Erro ao buscar courses:', error)
      }
    }
    fetchCoursesData()
  }, []) // courses

  const handleSort = (key: keyof Request) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredRequests = requests.filter(req => {
    const matchesDate = filterDate ? req.date === filterDate : true;
    const matchesStatus = filterStatus ? req.status === filterStatus : true;
    const matchesCourse = filterCourse ? req.curso === filterCourse : true;
    return matchesDate && matchesStatus && matchesCourse;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (aValue === undefined || bValue === undefined) return 0;
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const StatusBadge: React.FC<{ status: Request['status'] }> = ({ status }) => (
    <span className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}>
      {status}
    </span>
  );

  const clearFilters = () => {
    setFilterDate('');
    setFilterStatus('');
    setFilterCourse('');
  };

  if (loading) {
    return <div className="loading">Carregando dados do professor...</div>
}

  return (
    <div className="request-status-page">
      <header className="page-header">
        <h1>{title}</h1>
        <div className='header-filters'>
          <div className="filters-container">
            <div className="filter-group">
              <div className="filter-item">
                <label htmlFor="filter-date">Filtrar por Data</label>
                <input
                  id="filter-date"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="filter-input"
                />
              </div>
              <div className="filter-item">
                <label htmlFor="filter-status">Status</label>
                <select
                  id="filter-status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Todos</option>
                  <option value="Rascunho">Rascunho</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Em análise">Em análise</option>
                  <option value="Aprovado">Aprovado</option>
                  <option value="Rejeitado">Rejeitado</option>
                </select>
              </div>
              <div className="filter-item">
                <label htmlFor="filter-curso">Curso</label>
                <select
                  id="filter-curso"
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Todos</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={clearFilters} className="clear-filters">
              Limpar Filtros
            </button>
          </div>
          {userRole === 'Teacher' && (
            <div className="create-request-button-container">
              <button onClick={() => navigate('/request/new-request')} className="create-request-button">
                <i className="material-icons">add_circle</i>
                <span>Novo requerimento</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="requests-container">
        <div className="table-header">
          {['ID', 'Data', 'User', 'Curso', 'Disciplina', 'Status'].map((header, index) => (
            <div
              key={index}
              className="header-cell"
              onClick={() => handleSort(header.toLowerCase() as keyof Request)}
            >
              {header}
              {sortConfig?.key === header.toLowerCase() && (
                <span className="sort-arrow">
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </div>
          ))}
        </div>

        {sortedRequests.length > 0 ? (
          sortedRequests.map((req) => (
            <div key={req.id} className="request-card">
              <div className="request-cell">{req.id}</div>
              <div className="request-cell">{moment(req.date).format('LL')}</div>
              <div className="request-cell description-cell">
                {req.name || 'Sem descrição'}
              </div>
              <div className="request-cell">{req.curso || 'Sem curso'}</div>
              <div className="request-cell">{req.title}</div>
              <div className="request-cell">
                <StatusBadge status={req.status} />
              </div>
              {renderActions && (
                <div className="request-cell actions-cell">
                  {renderActions(req)}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-results">
            Nenhum requerimento encontrado com os filtros atuais
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestListGeneric;
