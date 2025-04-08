import { IRequest } from "./IRequest";
import { IStatusRequest } from "./IStatusRequest";

// src/interfaces/IUser.ts
export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  registration?: string;
  category?: 'Teacher' | 'Coordinator' | 'Director';
  photoUrl?: string;
  requests?: IRequest[];
  statusRequests?: IStatusRequest[]; // Defina de acordo com seu modelo
  isFirstLogin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserId {
  id: number;
}