// src/interfaces/IDiscipline.ts
import { IDepartment } from './IDepartment';
import { ITeacher } from './ITeacher';

export interface IDiscipline {
  id: number;
  name: string;
  code: string;
  workload: number;
  department: IDepartment;
  teachers: ITeacher[];
}