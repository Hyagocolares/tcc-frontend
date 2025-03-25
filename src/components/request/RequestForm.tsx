// src/components/request/RequestFormtsx
import React, { useState } from 'react'
import ApplicantForm, { createApplicant } from './forms/ApplicantForm'
import SubjectsForm, { createSubject } from './forms/SubjectsInputForms'
import LocationsAndDatesForm, { createLocationData } from './forms/LocationsAndDatesForm'
import ItineraryForm, { createItineraryItem } from './forms/ItineraryForm'
import ResourcesNecessaryForm, { createResource } from './forms/ResourcesNecessaryForm'
import TeacherConsentForm, { createTeacherConsentItem } from './forms/TeacherConsentForm'

import { IRequest } from '../../interfaces/IRequest'
import { IUserApplicant } from '../../interfaces/IUserApplicant'
import { ISubject } from '../../interfaces/ISubject'
import { ILocation } from '../../interfaces/ILocation'
import { IItineraryItem } from '../../interfaces/IItineraryItem'
import { IResource } from '../../interfaces/IResource'
import { ITeacherConsent } from '../../interfaces/ITeacherConsent'
import { IRequestStatus } from '../../interfaces/IRequestStatus'

const RequestForm: React.FC = () => {
    const [applicants, setApplicants] = useState<IUserApplicant[]>([createApplicant()])
    const [subjects, setSubjects] = useState<ISubject[]>([createSubject()])
    const [locations, setLocations] = useState<ILocation[]>([createLocationData()])
    const [itinerary, setItinerary] = useState<IItineraryItem[]>([createItineraryItem()])
    const [resources, setResources] = useState<IResource[]>([createResource()])
    const [consents, setConsents] = useState<ITeacherConsent[]>([createTeacherConsentItem()])

    const handleSubmit = async () => {

        const requestData: IRequest = {
            id: 0,
            user: applicants[0],
            companions: applicants,
            status: IRequestStatus.DRAFT,
            subjects: subjects,
            locations: locations,
            itinerary: itinerary,
            resources: resources,
            consents: consents,
            coordinatorConsents: [],
            directorConsents: [],
            createdAt: new Date()
        }

        // Lógica para enviar os dados para o backend
        console.log('Formulário enviado! : ' + JSON.stringify(requestData, null, 2))

        try {
            const response = await fetch('http://localhost:3000/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            console.log('Resposta do backend:', data);
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
        }

    }

    return (
        <div className="request-form-container">
            <form className="request-form" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                <div className="request-form-column">
                    <div className="request-form-group">
                        <ApplicantForm applicants={applicants} setApplicants={setApplicants} />
                    </div>

                    <div className="request-form-group">
                        <SubjectsForm subjects={subjects} setSubjects={setSubjects} />
                    </div>

                    <div className="request-form-group">
                        <LocationsAndDatesForm locations={locations} setLocations={setLocations} />
                    </div>

                    <div className="request-form-group">
                        <ItineraryForm itinerary={itinerary} setItinerary={setItinerary} />
                    </div>

                    <div className="request-form-group">
                        <ResourcesNecessaryForm resources={resources} setResources={setResources} />
                    </div>

                    <div className="request-form-group">
                        <TeacherConsentForm consents={consents} setConsents={setConsents} />
                    </div>
                </div>
                <button type="submit" className="request-next-button" onClick={() => {
                    alert('Cadastrado com sucesso!');
                    // window.location.href = '/request';
                }}>
                    → Criar
                </button>
            </form>
        </div>
    )
}

export default RequestForm