// src/interfaces/IRequest.ts
import { IUserApplicant } from './IUserApplicant'
import { ICleanCoordinatorConsent, ICoordinatorConsent } from './ICoordinatorConsent'
import { ICleanDirectorConsent, IDirectorConsent } from './IDirectorConsent'
import { IRequestStatus } from './IRequestStatus'
import { ICleanSubject } from './ISubject'
import { ICleanLocation } from './ILocation'
import { ICleanItinerary } from './IItineraryItem'
import { ICleanResources } from './IResource'
import { ICleanConsents } from './ITeacherConsent'

export interface IRequest {
  user: IUserApplicant
  companions: IUserApplicant[]
  status?: IRequestStatus
  subjects: ICleanSubject[]
  locations: ICleanLocation[]
  itinerary: ICleanItinerary[]
  resources: ICleanResources[]
  consent: ICleanConsents[]
  coordinatorConsents?: ICoordinatorConsent[]
  directorConsents?: IDirectorConsent[]
  createdAt?: Date
  updatedAt?: Date
}

export interface IRequestConsent {
  status: IRequestStatus
  coordinatorConsents?: ICleanCoordinatorConsent[]
  directorConsents?: ICleanDirectorConsent[]
  updatedAt?: Date
}

export interface IRequestId {
  id: number
}