// src/interfaces/IDirectorConsent.ts
import { IRequestId } from './IRequest';
import { IUserId } from './IUser';

export interface IDirectorConsent {
  id: number;
  opinion?: string;
  status?: string;
  request: IRequestId;
  userDirector: IUserId;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ICleanDirectorConsent {
  opinion?: string;
  status?: string;
  request: IRequestId;
  userDirector: IUserId;
  createdAt?: Date;
  updatedAt?: Date;
}