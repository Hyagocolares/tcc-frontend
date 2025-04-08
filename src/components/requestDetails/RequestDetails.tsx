// src/components/request/RequestDetails.tsx
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './RequestDetails.css'
import { getRequestById, IRequest } from '../../services/requestService'
import { FaUser, FaUsers, FaBook, FaMapMarkerAlt, FaRoute, FaBox, FaCheckCircle, FaUserTie, FaUserGraduate, FaSpinner, FaDownload } from 'react-icons/fa'
import api from '../../utils/API'

// Interfaces representando as partes do objeto
interface User {
  id: number
  name: string
  email: string
  registration: string | null
  category: string
  photoUrl: string | null
  isFirstLogin: boolean
  createdAt: string
  updatedAt: string
}

interface Discipline {
  id: number
  name: string
  code: string
  workload: number
}

interface Course {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

interface Subject {
  id: number
  classGroup: string
  studentCount: number
  workload: number
  fileData: string
  fileName: string
  fileType: string
  createdAt: string
  updatedAt: string
  subject: Discipline & {
    courses: Course[]
    teachers?: User[]
    coordinators?: User[]
  }
}

interface Location {
  id: number
  location: string
  municipality: string
  periodStart: string
  periodEnd: string
  totalDistanceKm: string
  createdAt: string
  updatedAt: string
}

interface ItineraryItem {
  id: number
  date: string
  origin: string
  destination: string
  activity: string
  departureTime: string
  arrivalTime: string
  unpavedRoadKm: number
  kilometers: string
  roadCondition: string
  hasWoodenBridge: boolean
  hasFerry: boolean
  hasToll: boolean
  createdAt: string
  updatedAt: string
}

interface Resource {
  id: number
  resource: string
  quantity: number
  quantityPerDay: number
  createdAt: string
  updatedAt: string
}

interface Request {
  id: number
  status: string
  createdAt: string
  updatedAt: string
  user: User
  companions: User[]
  subjects: Subject[]
  locations: Location[]
  itinerary: ItineraryItem[]
  resources: Resource[]
  consent: Consent[]
}

interface Consent {
  id: number
  date: string
  timeIn: string
  timeOut: string
  teacher: User
  discipline: Discipline
}

interface DirectorConsent {
  id: number
  accepted: boolean
  opinion?: string
  createdAt: string
  updatedAt: string
  userDirector: {
    id: number
    name: string
    email: string
  }
  request: {
    id: number
  }
}

const ConsentSection: React.FC<{ request: IRequest, isLoadingConsents: boolean }> = ({ request, isLoadingConsents }) => {
  if (isLoadingConsents) {
    return (
      <div className="loading-spinner">
        <span className="icon-container">
          <FaSpinner size={20} />
        </span>
        <span>Carregando consentimentos...</span>
      </div>
    );
  }

  return (
    <div className="section">
      <h3>
        <span className="icon-container">
          <FaCheckCircle size={20} />
        </span>
        Consentimentos dos Professores
      </h3>
      <div className="content">
        {request.consent && request.consent.length > 0 ? (
          request.consent.map((consent, index) => (
            <div key={index} className="consent-item">
              <p>
                <strong>Professor:</strong>{' '}
                {consent.teacher?.name || 'Nome não disponível'}
              </p>
              <p>
                <strong>Disciplina:</strong>{' '}
                {consent.discipline?.name || 'Nome não disponível'} ({consent.discipline?.code || 'Código não disponível'})
              </p>
              <p>
                <strong>Data:</strong> {consent.date}
              </p>
              <p>
                <strong>Horário:</strong> {consent.timeIn} - {consent.timeOut}
              </p>
            </div>
          ))
        ) : (
          <p>Nenhum consentimento registrado.</p>
        )}
      </div>
    </div>
  );
};

const getFileIcon = (fileType: string): string => {
  const typeMap: { [key: string]: string } = {
    'application/pdf': '📄',
    'image/': '🖼️',
    'video/': '🎥',
    'audio/': '🎵',
    'text/': '📝',
    'application/zip': '📦',
    'default': '📁'
  }

  const match = Object.keys(typeMap).find(key => fileType.startsWith(key))
  return match ? typeMap[match] : typeMap.default
}

const downloadFile = (base64: string, fileName: string, mimeType: string) => {
  const link = document.createElement('a')
  link.href = `data:${mimeType};base64,${base64}`
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const SubjectsSection: React.FC<{ subjects: IRequest['subjects'] }> = ({ subjects }) => {
  return (
    <div className="section">
      <h3>
        <span className="icon-container">
          <FaBook size={20} />
        </span>
        Disciplinas
      </h3>
      <div className="content">
        {subjects && subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <div key={index} className="subject-item">
              <p>
                <strong>Disciplina:</strong>{' '}
                {subject.subject?.name || 'Nome não disponível'} ({subject.subject?.code || 'Código não disponível'})
              </p>
              <p>
                <strong>Turma:</strong> {subject.classGroup}
              </p>
              <p>
                <strong>Número de Alunos:</strong> {subject.studentCount}
              </p>
              <p>
                <strong>Carga Horária:</strong> {subject.workload} horas
              </p>
              
              {subject.fileData && subject.fileName && subject.fileType && (
                <div className="file-preview">
                  <div className="file-info">
                    <span className="file-icon">{getFileIcon(subject.fileType)}</span>
                    <div className="file-details">
                      <span className="file-name">{subject.fileName}</span>
                      <span className="file-meta">
                        {subject.fileType} •
                        {(subject.fileData.length * 0.75 / 1024 / 1024).toFixed(2)}MB
                      </span>
                    </div>
                  </div>
                  <button
                    className="download-btn"
                    onClick={() => downloadFile(subject.fileData!, subject.fileName!, subject.fileType!)}
                    title="Baixar arquivo"
                  >
                    <FaDownload size={16} />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Nenhuma disciplina registrada.</p>
        )}
      </div>
    </div>
  );
};

const RequestDetails: React.FC = () => {
  const [request, setRequest] = useState<IRequest | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingConsents, setIsLoadingConsents] = useState<boolean>(false)
  const [directorConsent, setDirectorConsent] = useState<DirectorConsent | null>(null)
  const [isLoadingDirectorConsent, setIsLoadingDirectorConsent] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (!id) {
          setError('ID do requerimento não fornecido')
          setIsLoading(false)
          return
        }

        const requestId = Number(id)
        if (isNaN(requestId)) {
          setError('ID do requerimento inválido')
          setIsLoading(false)
          return
        }

        const data = await getRequestById(requestId)
        setRequest(data)
        setIsLoading(false)
        
        // Buscar o consentimento do diretor
        setIsLoadingDirectorConsent(true)
        try {
          const response = await api.get(`/v1/consents/director/request/${requestId}`)
          setDirectorConsent(response.data.consent)
        } catch (err) {
          console.error('Erro ao buscar consentimento do diretor:', err)
        } finally {
          setIsLoadingDirectorConsent(false)
        }
        
        // Se houver consentimentos, buscar informações adicionais
        if (data.consent && data.consent.length > 0) {
          setIsLoadingConsents(true)
          try {
            // Buscar informações detalhadas para cada consentimento
            const consentPromises = data.consent.map(async (consent) => {
              try {
                // Verificar se já temos os dados do professor e disciplina
                if (consent.teacher && consent.discipline) {
                  return consent;
                }
                
                // Buscar informações do consentimento com professor e disciplina
                const teacherConsentResponse = await api.get(`/v1/teacherConsentDisciplines/${consent.id}`);
                const teacherConsent = teacherConsentResponse.data?.consent;
                
                if (teacherConsent && teacherConsent.teacher && teacherConsent.discipline) {
                  return {
                    ...consent,
                    teacher: teacherConsent.teacher,
                    discipline: teacherConsent.discipline
                  };
                }
                
                return consent;
              } catch (err) {
                console.error('Erro ao buscar detalhes do consentimento:', err);
                return consent;
              }
            });
            
            const updatedConsents = await Promise.all(consentPromises);
            setRequest(prevRequest => {
              if (prevRequest) {
                return {
                  ...prevRequest,
                  consent: updatedConsents
                };
              }
              return prevRequest;
            });
          } catch (err) {
            console.error('Erro ao buscar detalhes dos consentimentos:', err);
          } finally {
            setIsLoadingConsents(false);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar requerimento:', error)
        setError('Erro ao buscar requerimento. Por favor, tente novamente.')
        setIsLoading(false)
      }
    }

    fetchRequest()
  }, [id])

  if (isLoading) {
    return <div className="loading-container">Carregando...</div>
  }

  if (error) {
    return <div className="error-container">{error}</div>
  }

  if (!request) {
    return <div className="error-container">Requerimento não encontrado.</div>
  }

  return (
    <div className="request-details-container">
      <div className="request-header">
        <h2>Detalhes do Requerimento</h2>
        <div className="request-status">
          <span className={`status-badge ${request.status.toLowerCase()}`}>
            {request.status}
          </span>
        </div>
      </div>

      <div className="request-sections">
        <section className="request-section">
          <h3 className="section-title">Informações Básicas</h3>
          <div className="section-content">
            <div className="info-item">
              <span className="info-label">ID:</span>
              <span className="info-value">{request.id}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Criado em:</span>
              <span className="info-value">{new Date(request.createdAt).toLocaleString()}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Atualizado em:</span>
              <span className="info-value">{new Date(request.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </section>

        <section className="request-section">
          <h3 className="section-title">
            <FaUser size={20} />
            Usuário Responsável
          </h3>
          <div className="section-content">
            <div className="info-item">
              <span className="info-label">Nome:</span>
              <span className="info-value">{request.user.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{request.user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Categoria:</span>
              <span className="info-value">{request.user.category}</span>
            </div>
            {request.user.registration && (
              <div className="info-item">
                <span className="info-label">Matrícula:</span>
                <span className="info-value">{request.user.registration}</span>
              </div>
            )}
          </div>
        </section>

        <section className="request-section">
          <h3 className="section-title">
            <FaUsers size={20} />
            Acompanhantes
          </h3>
          <div className="section-content">
            {request.companions.length > 0 ? (
              <div className="companions-list">
                {request.companions.map(companion => (
                  <div key={companion.id} className="companion-item">
                    <div className="companion-info">
                      <span className="companion-name">{companion.name}</span>
                      <span className="companion-email">{companion.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">Nenhum acompanhante adicionado.</p>
            )}
          </div>
        </section>

        <section className="request-section">
          <h3 className="section-title">
            <FaBook size={20} />
            Disciplinas
          </h3>
          <div className="section-content">
            <SubjectsSection subjects={request.subjects} />
          </div>
        </section>

        <section className="request-section">
          <h3 className="section-title">
            <FaMapMarkerAlt size={20} />
            Locais
          </h3>
          <div className="section-content">
            {request.locations.length > 0 ? (
              <div className="locations-list">
                {request.locations.map(location => (
                  <div key={location.id} className="location-card">
                    <h4>{location.location}</h4>
                    <div className="location-details">
                      <div className="info-item">
                        <span className="info-label">Município:</span>
                        <span className="info-value">{location.municipality}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Período:</span>
                        <span className="info-value">
                          {new Date(location.periodStart).toLocaleDateString()} - {new Date(location.periodEnd).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Distância Total:</span>
                        <span className="info-value">{location.totalDistanceKm} km</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">Nenhum local associado.</p>
            )}
          </div>
        </section>

        <section className="request-section">
          <h3 className="section-title">
            <FaRoute size={20} />
            Itinerário
          </h3>
          <div className="section-content">
            {request.itinerary.length > 0 ? (
              <div className="itinerary-list">
                {request.itinerary.map(item => (
                  <div key={item.id} className="itinerary-card">
                    <div className="itinerary-header">
                      <h4>{new Date(item.date).toLocaleDateString()}</h4>
                      <span className="itinerary-activity">{item.activity}</span>
                    </div>
                    <div className="itinerary-details">
                      <div className="route-info">
                        <div className="route-point">
                          <span className="point-label">Origem:</span>
                          <span className="point-value">{item.origin}</span>
                          <span className="time">{item.departureTime}</span>
                        </div>
                        <div className="route-arrow">→</div>
                        <div className="route-point">
                          <span className="point-label">Destino:</span>
                          <span className="point-value">{item.destination}</span>
                          <span className="time">{item.arrivalTime}</span>
                        </div>
                      </div>
                      <div className="route-details">
                        <div className="info-item">
                          <span className="info-label">Distância:</span>
                          <span className="info-value">{item.kilometers} km</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Condição da Via:</span>
                          <span className="info-value">{item.roadCondition}</span>
                        </div>
                        <div className="route-features">
                          {item.hasWoodenBridge && <span className="feature-tag">Ponte de Madeira</span>}
                          {item.hasFerry && <span className="feature-tag">Balsa</span>}
                          {item.hasToll && <span className="feature-tag">Pedágio</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">Nenhum item de itinerário associado.</p>
            )}
          </div>
        </section>

        <section className="request-section">
          <h3 className="section-title">
            <FaBox size={20} />
            Recursos
          </h3>
          <div className="section-content">
            {request.resources.length > 0 ? (
              <div className="resources-list">
                {request.resources.map(resource => (
                  <div key={resource.id} className="resource-card">
                    <h4>{resource.resource}</h4>
                    <div className="resource-details">
                      <div className="info-item">
                        <span className="info-label">Quantidade:</span>
                        <span className="info-value">{resource.quantity}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Quantidade por Dia:</span>
                        <span className="info-value">{resource.quantityPerDay}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">Nenhum recurso solicitado.</p>
            )}
          </div>
        </section>

        <section className="request-section">
          <h3 className="section-title">
            <FaCheckCircle size={20} />
            Consentimentos
          </h3>
          <div className="section-content">
            <ConsentSection request={request} isLoadingConsents={isLoadingConsents} />
          </div>
        </section>
      </div>

      <div className="request-footer">
        <section className="request-section">
          <h3 className="section-title">
            <FaUserTie size={20} />
            Consentimento do Diretor
          </h3>
          <div className="section-content">
            {isLoadingDirectorConsent ? (
              <div className="loading-spinner">
                <FaSpinner size={20} />
                <span>Carregando consentimento do diretor...</span>
              </div>
            ) : directorConsent ? (
              <div className="consent-item">
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`status-badge ${directorConsent.accepted ? 'approved' : 'rejected'}`}>
                    {directorConsent.accepted ? 'Aprovado' : 'Rejeitado'}
                  </span>
                </p>
                {directorConsent.opinion && (
                  <p>
                    <strong>Opinião:</strong> {directorConsent.opinion}
                  </p>
                )}
                <p>
                  <strong>Data de Criação:</strong> {new Date(directorConsent.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Última Atualização:</strong> {new Date(directorConsent.updatedAt).toLocaleString()}
                </p>
                <p>
                  <strong>Diretor:</strong> {directorConsent.userDirector.name} ({directorConsent.userDirector.email})
                </p>
              </div>
            ) : (
              <p className="empty-message">Nenhum consentimento do diretor registrado.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default RequestDetails
