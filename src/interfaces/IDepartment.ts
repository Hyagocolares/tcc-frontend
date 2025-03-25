// src/interfaces/IDepartment.ts
import { IDiscipline } from './IDiscipline';
import { ITeacher } from './ITeacher';
import { ICoordinator } from './ICoordinator';

export interface IDepartment {
  id: number; // ou string, conforme sua escolha; aqui usamos number para BIGINT
  name: string;
  courses: string[];
  disciplines: IDiscipline[];
  teachers: ITeacher[];
  coordinators: ICoordinator[];
}