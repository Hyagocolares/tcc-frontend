// src/interfaces/IDirectorConsent.ts
import { IRequestId } from './IRequest';

export interface IDirectorConsent {
  id: number;
  opinion?: string;
  status?: string;
  request: IRequestId;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ICleanDirectorConsent {
  opinion?: string;
  status?: string;
  request: IRequestId;
  createdAt?: Date;
  updatedAt?: Date;
}