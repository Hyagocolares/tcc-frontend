// src/interfaces/ICoordinatorConsent.ts
import { IRequest } from './IRequest';

export interface ICoordinatorConsent {
  id: number;
  signature: string;
  opinion?: string;
  request: IRequest;
  createdAt: Date;
  updatedAt: Date;
}