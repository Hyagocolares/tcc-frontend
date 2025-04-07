import api from '../utils/API';

export interface IRequest {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    registration: string | null;
    category: string;
    photoUrl: string | null;
    isFirstLogin: boolean;
  };
  companions: Array<{
    id: number;
    name: string;
    email: string;
  }>;
  subjects: Array<{
    id: number;
    classGroup: string;
    studentCount: number;
    workload: number;
    fileData: string;
    fileName: string;
    fileType: string;
    subject: {
      id: number;
      name: string;
      code: string;
      workload: number;
      courses: Array<{
        id: number;
        name: string;
      }>;
      teachers?: Array<{
        id: number;
        name: string;
        email: string;
      }>;
      coordinators?: Array<{
        id: number;
        name: string;
        email: string;
      }>;
    };
  }>;
  locations: Array<{
    id: number;
    location: string;
    municipality: string;
    periodStart: string;
    periodEnd: string;
    totalDistanceKm: string;
  }>;
  itinerary: Array<{
    id: number;
    date: string;
    origin: string;
    destination: string;
    activity: string;
    departureTime: string;
    arrivalTime: string;
    unpavedRoadKm: number;
    kilometers: string;
    roadCondition: string;
    hasWoodenBridge: boolean;
    hasFerry: boolean;
    hasToll: boolean;
  }>;
  resources: Array<{
    id: number;
    resource: string;
    quantity: number;
    quantityPerDay: number;
  }>;
  consent: Array<{
    id: number;
    teacher: {
      id: number;
      name: string;
      email: string;
    };
    discipline: {
      id: number;
      name: string;
      code: string;
    };
    date: string;
    timeIn: string;
    timeOut: string;
  }>;
  coordinatorConsents: Array<{
    id: number;
    accepted: boolean;
    opinion?: string;
    userCoordinator: {
      id: number;
      name: string;
      email: string;
    };
  }>;
  directorConsents: Array<{
    id: number;
    accepted: boolean;
    opinion?: string;
    userDirector: {
      id: number;
      name: string;
      email: string;
    };
  }>;
}

export const getRequestById = async (id: number): Promise<IRequest> => {
  try {
    const response = await api.get(`/v1/requests/${id}`);
    if (response.data && response.data.request) {
      return response.data.request;
    }
    throw new Error('Request não encontrada');
  } catch (error) {
    console.error('Erro ao buscar request:', error);
    throw error;
  }
}; 