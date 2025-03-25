import { IDiscipline } from "./IDiscipline"
import { IUser } from "./IUser"

export interface ITeacherConsentDiscipline {
    id: number
    teacherName: IUser
    discipline: IDiscipline
    date: string
    time: string
    signature: string
    createdAt: Date;
    updatedAt: Date;
  }