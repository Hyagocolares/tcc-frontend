// src/interfaces/IDiscipline.ts
import { ICourse } from './ICourse';
import { ITeacher } from './ITeacher';

export interface IDiscipline {
  id: number;
  name: string;
  code?: string;
  workload?: number;
  course?: ICourse;
  teachers?: ITeacher[];
}