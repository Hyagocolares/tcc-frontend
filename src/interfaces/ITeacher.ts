// src/interfaces/ITeacher.ts
import { IUser } from './IUser';

export interface ITeacher extends IUser {
  academicBackground?: string;
  course?: string[];
  disciplines?: string[];
  requests?: string[];
}