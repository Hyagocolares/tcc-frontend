import { IDiscipline } from "./IDiscipline";
import { ITeacher } from "./ITeacher";

// src/interfaces/ITeacherConsent.ts
export interface ITeacherConsent {
  id: number;
  teacher: ITeacher;
  discipline: IDiscipline;
  date: string;
  timeIn: string;
  timeOut: string;
}

export interface ICleanConsents {
  teacher: Pick<ITeacher, 'id'>;
  discipline: Pick<IDiscipline, 'id'>;
  date: string;
  timeIn: string;
  timeOut: string;
}