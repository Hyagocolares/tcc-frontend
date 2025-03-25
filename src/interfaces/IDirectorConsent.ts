// src/interfaces/IDirectorConsent.ts
import { IRequest } from './IRequest';

export interface IDirectorConsent {
  id: number;
  signature: string;
  opinion?: string;
  request: IRequest;
  createdAt: Date;
  updatedAt: Date;
}