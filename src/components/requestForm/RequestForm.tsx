// src/components/requestForm/RequestForm.tsx
import React, { useState } from 'react'
import api from '../../utils/API'
import "./RequestForm.css"

import ApplicantForm, { createApplicant } from './forms/ApplicantForm'
import SubjectsForm, { createSubject } from './forms/SubjectsInputForms'
import LocationsAndDatesForm, { createLocationData } from './forms/LocationsAndDatesForm'
import ItineraryForm, { createItineraryItem } from './forms/ItineraryForm'
import ResourcesNecessaryForm, { createResource } from './forms/ResourcesNecessaryForm'
import TeacherConsentForm, { createTeacherConsentItem } from './forms/TeacherConsentForm'

import { IRequest } from '../../interfaces/IRequest'
import { IUserApplicant } from '../../interfaces/IUserApplicant'
import { ICleanSubject, ISubject } from '../../interfaces/ISubject'
import { ICleanLocation, ILocation } from '../../interfaces/ILocation'
import { ICleanItinerary, IItineraryItem } from '../../interfaces/IItineraryItem'
import { ICleanResources, IResource } from '../../interfaces/IResource'
import { ICleanConsents, ITeacherConsent } from '../../interfaces/ITeacherConsent'
import { clearCache } from '../../utils/debouncedUpdateTeachers'
import { useNavigate } from 'react-router-dom'

const RequestForm: React.FC = () => {
    const [applicants, setApplicants] = useState<IUserApplicant[]>([createApplicant()])
    const [subjects, setSubjects] = useState<ISubject[]>([createSubject(applicants.map(applicant => applicant.id))])
    const [locations, setLocations] = useState<ILocation[]>([createLocationData()])
    const [itinerary, setItinerary] = useState<IItineraryItem[]>([createItineraryItem()])
    const [resources, setResources] = useState<IResource[]>([createResource()])
    const [consents, setConsents] = useState<ITeacherConsent[]>([createTeacherConsentItem()])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    if (loading) {
        setTimeout(() => setLoading(false), 500)
    }

    const handleSubmit = async () => {
        const cleanSubjects: ICleanSubject[] = subjects.map(({ id, applicantId, ...rest }) => rest)
        const cleanLocations: ICleanLocation[] = locations.map(({ id, ...rest }) => rest)
        const cleanItinerary: ICleanItinerary[] = itinerary.map(({ id, ...rest }) => rest)
        const cleanResources: ICleanResources[] = resources.map(({ id, ...rest }) => rest)
        // const cleanConsents: ICleanConsents[] = consents.map(({ id, ...rest }) => rest)

        const cleanConsents: ICleanConsents[] = consents.map(({ id, teacher, discipline, ...rest }) => ({
            teacher: { id: teacher.id },
            discipline: { id: discipline.id },
            ...rest
        }))

        // console.log('Applicants:', applicants)
        // console.log('Subjects:', cleanSubjects)
        // console.log('Locations:', cleanLocations)
        // console.log('Itinerary:', cleanItinerary)
        // console.log('Resources:', cleanResources)
        // console.log('Consents:', cleanConsents)

        const requestData: IRequest = {
            user: applicants[0],
            companions: applicants.slice(1),
            subjects: cleanSubjects,
            locations: cleanLocations,
            itinerary: cleanItinerary,
            resources: cleanResources,
            consent: cleanConsents
        }

        console.log('Formulário enviado! : ', JSON.stringify(requestData, null, 2))

        try {
            console.log('📤 Enviando requestData:', requestData)
            const responseRequests = await api.post(`/v1/requests`, requestData)

            if (responseRequests) {
                console.log('✅ Sucesso:', responseRequests.data)
            } else {
                console.error('Resposta da API não contém os dados esperados.', responseRequests)
            }
            clearCache();
            navigate('/request')
        } catch (error: any) {
            console.error('❌ Erro ao enviar request:', error.response?.data || error.message)
            if (error.response?.status === 401) {
                alert('Sessão expirada. Faça login novamente.')
                window.location.href = '/login'
            } else {
                alert('Erro ao enviar o formulário. Tente novamente mais tarde.')
            }
        }
    }

    if (loading) {
        return <div className="loading">Carregando dados do professor...</div>
    }

    return (
        <div className="request-form-container">
            <div className="form-wrapper">
                <form className="request-form" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                    <div className="request-form-column">
                        <div className="request-form-group">
                            <ApplicantForm
                                applicants={applicants}
                                setApplicants={setApplicants} />
                        </div>

                        <div className="request-form-group">
                            {applicants.length > 0 && (
                                <SubjectsForm
                                    subjects={subjects}
                                    setSubjects={setSubjects}
                                    applicants={applicants} />
                            )}
                        </div>

                        <div className="request-form-group">
                            <LocationsAndDatesForm
                                locations={locations}
                                setLocations={setLocations} />
                        </div>

                        <div className="request-form-group">
                            <ItineraryForm
                                itinerary={itinerary}
                                setItinerary={setItinerary} />
                        </div>

                        <div className="request-form-group">
                            <ResourcesNecessaryForm
                                resources={resources}
                                setResources={setResources} />
                        </div>

                        <div className="request-form-group">
                            <TeacherConsentForm
                                consents={consents}
                                setConsents={setConsents} />
                        </div>
                    </div>
                    <button type="submit" className="request-next-button">
                        → Criar
                    </button>
                </form>
                <button className="back-button" onClick={() => navigate('/request')}>
                    Voltar
                </button>
            </div>
        </div>
    )
}

export default RequestForm
