// src/interfaces/ITeacher.ts
import { ICourse } from './ICourse';
import { IDiscipline } from './IDiscipline';
import { IRequest } from './IRequest';
import { ITeacherConsent } from './ITeacherConsent';
import { IUser } from './IUser';

export interface ITeacher extends IUser {
  academicBackground: string;
  course?: ICourse[];
  disciplines?: IDiscipline[];
  teacherRequests?: IRequest[];
  teacherConsents?: ITeacherConsent[];
}