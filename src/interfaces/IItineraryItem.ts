// src/interfaces/IItineraryItem.ts
export interface IItineraryItem {
  id: number
  date: string
  origin: string
  destination: string
  activity: string
  departureTime: string
  arrivalTime: string
  unpavedRoadKm: boolean
  kilometers: number
  roadCondition: "Boa" | "Regular" | "Ruim"
  hasWoodenBridge: boolean
  hasFerry: boolean
  hasToll: boolean
}

export interface ICleanItinerary {
  date: string
  origin: string
  destination: string
  activity: string
  departureTime: string
  arrivalTime: string
  unpavedRoadKm: boolean
  kilometers: number
  roadCondition: "Boa" | "Regular" | "Ruim"
  hasWoodenBridge: boolean
  hasFerry: boolean
  hasToll: boolean
}