// src/interfaces/ICoordinator.ts
import { ICoordinatorConsent } from './ICoordinatorConsent';
import { ICourse } from './ICourse';
import { IDiscipline } from './IDiscipline';
import { IUser } from './IUser';

export interface ICoordinator extends IUser {
  supervision: string;
  course?: ICourse[];
  disciplines?: IDiscipline[];
  coordinatorConsents?: ICoordinatorConsent[];
}