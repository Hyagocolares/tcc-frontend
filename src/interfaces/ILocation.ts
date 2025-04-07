// src/interfaces/ILocation.ts
export interface ILocation {
  id?: number
  location: string
  municipality: string
  periodStart: Date | string
  periodEnd: Date | string
  totalDistanceKm: number
}

export interface ICleanLocation {
  location: string
  municipality: string
  periodStart: Date | string
  periodEnd: Date | string
  totalDistanceKm: number
}