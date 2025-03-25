// src/interfaces/IDirector.ts
import { IUser } from './IUser';

export interface IDirector extends IUser {
  academicBackground?: string;
}