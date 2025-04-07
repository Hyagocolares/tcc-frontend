// src/interfaces/IDirector.ts
import { IDirectorConsent } from './IDirectorConsent';
import { IUser } from './IUser';

export interface IDirector extends IUser {
  directorConsents?: IDirectorConsent[];
}