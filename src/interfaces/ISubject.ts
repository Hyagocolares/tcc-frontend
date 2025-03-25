// src/interfaces/ISubject.ts
export interface ISubject {
    id: number
    subject: string
    classGroup: string
    numberOfStudents: number
    workload: number
    fileBase64: string;
    fileName: string;
    fileType: string;
  }