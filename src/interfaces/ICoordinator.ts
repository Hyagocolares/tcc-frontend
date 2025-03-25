// src/interfaces/ICoordinator.ts
import { IUser } from './IUser';

export interface ICoordinator extends IUser {
  supervision: string;
  academicBackground?: string;
  course?: string[];
  disciplines?: string[];
  requests?: string[];
}