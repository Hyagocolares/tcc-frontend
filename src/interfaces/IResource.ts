// src/interfaces/IResource.ts
export interface IResource {
  id: number;
  resource: string;
  quantity: number;
  quantityPerDay: number;
}

export interface ICleanResources {
  resource: string;
  quantity: number;
  quantityPerDay: number;
}