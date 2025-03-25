// src/interfaces/IUser.ts
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  registration?: string;
  category?: 'Teacher' | 'Coordinator' | 'Director';
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}