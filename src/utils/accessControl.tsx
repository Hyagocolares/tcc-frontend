// src/utils/accessControl.ts
import { jwtDecode } from "jwt-decode";

export type Role = 'Teacher' | 'Coordinator' | 'Director';

export const getUserRole = (): Role => {
  try {
    const token = localStorage.getItem('token');
    console.log('Token raw:', token);
    
    if (!token) return 'Teacher';
    
    const decoded = jwtDecode<{ category?: Role }>(token);
    console.log('Decoded token:', decoded);
    return decoded.category || 'Teacher';
    
  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem('token');
    return 'Teacher';
  }
};