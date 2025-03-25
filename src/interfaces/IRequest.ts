// src/interfaces/IRequest.ts
import { IUserApplicant } from './IUserApplicant'
import { ICoordinatorConsent } from './ICoordinatorConsent'
import { IDirectorConsent } from './IDirectorConsent'
import { IRequestStatus } from './IRequestStatus'
import { ISubject } from './ISubject'
import { ILocation } from './ILocation'
import { IItineraryItem } from './IItineraryItem'
import { IResource } from './IResource'
import { ITeacherConsent } from './ITeacherConsent'

export interface IRequest {
  id: number
  user: IUserApplicant
  companions: IUserApplicant[]
  status: IRequestStatus
  subjects: ISubject[]
  locations: ILocation[]
  itinerary: IItineraryItem[]
  resources: IResource[]
  consents: ITeacherConsent[]
  coordinatorConsents: ICoordinatorConsent[]
  directorConsents: IDirectorConsent[]
  createdAt?: Date
  updatedAt?: Date
}