// src/interfaces/IItineraryItem.ts
export interface IItineraryItem {
    id: number 
    date: string
    origin: string
    destination: string
    activity: string
    departureTime: string
    arrivalTime: string
    unpavedRoad: string
    kilometers: number
    roadCondition: string
    hasWoodenBridge: string
    hasFerry: string
    hasToll: string
  }