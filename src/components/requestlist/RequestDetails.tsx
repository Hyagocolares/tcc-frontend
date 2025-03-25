// src/components/request/RequestDetails.tsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
  teacher: User
  coordinator: User
  // Os arrays de consentimentos e teacherConsentDisciplines foram omitidos para simplificação
}

const RequestDetails: React.FC = () => {
  const [request, setRequest] = useState<Request | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // Exemplo de chamada para obter o requerimento com id=4
    axios.get<Request>('/api/requests/4')
      .then(response => {
        setRequest(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Erro ao buscar o requerimento:', error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!request) {
    return <div>Requerimento não encontrado.</div>
  }

  return (
    <div className="container-request-details">
      <h2>Detalhes do Requerimento</h2>
      
      <section>
        <h3>Informações Básicas</h3>
        <p><strong>ID:</strong> {request.id}</p>
        <p><strong>Status:</strong> {request.status}</p>
        <p>
          <strong>Criado em:</strong> {new Date(request.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Atualizado em:</strong> {new Date(request.updatedAt).toLocaleString()}
        </p>
      </section>

      <section>
        <h3>Usuário Responsável</h3>
        <p><strong>Nome:</strong> {request.user.name}</p>
        <p><strong>Email:</strong> {request.user.email}</p>
      </section>

      <section>
        <h3>Companions</h3>
        {request.companions.length > 0 ? (
          <ul>
            {request.companions.map(companion => (
              <li key={companion.id}>
                {companion.name} ({companion.email})
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum companion adicionado.</p>
        )}
      </section>

      <section>
        <h3>Subjects</h3>
        {request.subjects.length > 0 ? (
          request.subjects.map(subject => (
            <div key={subject.id} style={{ marginBottom: '1rem' }}>
              <p><strong>Turma:</strong> {subject.classGroup}</p>
              <p><strong>Nº de Alunos:</strong> {subject.studentCount}</p>
              <p><strong>Carga Horária:</strong> {subject.workload} horas</p>
              <p><strong>Arquivo:</strong> {subject.fileName} ({subject.fileType})</p>
              <p>
                <strong>Disciplina:</strong> {subject.subject.name} - {subject.subject.code}
              </p>
            </div>
          ))
        ) : (
          <p>Nenhum subject associado.</p>
        )}
      </section>

      <section>
        <h3>Locations</h3>
        {request.locations.length > 0 ? (
          request.locations.map(location => (
            <div key={location.id} style={{ marginBottom: '1rem' }}>
              <p><strong>Local:</strong> {location.location}</p>
              <p><strong>Município:</strong> {location.municipality}</p>
              <p>
                <strong>Período:</strong> {new Date(location.periodStart).toLocaleString()} - {new Date(location.periodEnd).toLocaleString()}
              </p>
              <p><strong>Distância Total (km):</strong> {location.totalDistanceKm}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma location associada.</p>
        )}
      </section>

      <section>
        <h3>Itinerário</h3>
        {request.itinerary.length > 0 ? (
          request.itinerary.map(item => (
            <div key={item.id} style={{ marginBottom: '1rem' }}>
              <p><strong>Data:</strong> {new Date(item.date).toLocaleDateString()}</p>
              <p><strong>Origem:</strong> {item.origin}</p>
              <p><strong>Destino:</strong> {item.destination}</p>
              <p><strong>Atividade:</strong> {item.activity}</p>
              <p>
                <strong>Horário de Partida:</strong> {new Date(item.departureTime).toLocaleTimeString()}
              </p>
              <p>
                <strong>Horário de Chegada:</strong> {new Date(item.arrivalTime).toLocaleTimeString()}
              </p>
              <p><strong>Km:</strong> {item.kilometers}</p>
              <p><strong>Condição da Via:</strong> {item.roadCondition}</p>
            </div>
          ))
        ) : (
          <p>Nenhum item de itinerário associado.</p>
        )}
      </section>

      <section>
        <h3>Recursos</h3>
        {request.resources.length > 0 ? (
          request.resources.map(resource => (
            <div key={resource.id} style={{ marginBottom: '1rem' }}>
              <p><strong>Recurso:</strong> {resource.resource}</p>
              <p><strong>Quantidade:</strong> {resource.quantity}</p>
              <p><strong>Quantidade por Dia:</strong> {resource.quantityPerDay}</p>
            </div>
          ))
        ) : (
          <p>Nenhum recurso solicitado.</p>
        )}
      </section>

      <section>
        <h3>Dados de Professor e Coordenador</h3>
        <div>
          <p><strong>Professor:</strong> {request.teacher.name} ({request.teacher.email})</p>
        </div>
        <div>
          <p><strong>Coordenador:</strong> {request.coordinator.name} ({request.coordinator.email})</p>
        </div>
      </section>
    </div>
  )
}

export default RequestDetails
