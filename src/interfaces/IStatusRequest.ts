// src/interfaces/IStatusRequest.ts
import { IRequest } from './IRequest';
import { IRequestStatus } from './IRequestStatus';

export interface IStatusRequest {
  id: number;
  status: IRequestStatus;
  comment?: string;
  request: IRequest[];
  createdAt?: Date
  updatedAt?: Date
}