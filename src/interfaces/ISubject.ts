// src/interfaces/ISubject.ts
export interface ISubject {
    id: number
    subject: { id: number, name?: string}
    classGroup: string
    studentCount: number
    workload: number
    fileData: string;
    fileName: string;
    fileType: string;
    applicantId?: number[];
  }

  export interface ICleanSubject {
    subject: { id: number };
    classGroup: string;
    studentCount: number;
    workload: number;
    fileData: string;
    fileName: string;
    fileType: string;
  }