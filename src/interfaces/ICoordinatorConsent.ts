// src/interfaces/ICoordinatorConsent.ts

export interface ICoordinatorConsent {
  id: number;
  opinion: string;
  request: { id: number };
  createdAt: Date;
  updatedAt?: Date;
}

export interface ICleanCoordinatorConsent {
  opinion: string;
  status: string;
}