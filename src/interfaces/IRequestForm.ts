export interface IRequestForm {
    status: string;
    user: {
      id: number;
    };
    companions: { id: number }[];
    subjects: {
      subject: { id: number };
      classGroup: string;
      studentCount: number;
      workload: number;
      fileData: string;
      fileName: string;
      fileType: string;
    }[];
    locations: {
      location: string;
      municipality: string;
      periodStart: string;
      periodEnd: string;
      totalDistanceKm: number;
    }[];
    itinerary: {
      date: string;
      origin: string;
      destination: string;
      activity: string;
      departureTime: string;
      arrivalTime: string;
      unpavedRoadKm: number;
      kilometers: number;
      roadCondition: string;
      hasWoodenBridge: boolean;
      hasFerry: boolean;
      hasToll: boolean;
    }[];
    resources: {
      resource: string;
      quantity: number;
      quantityPerDay: number;
    }[];
    consent: {
      teacher: { id: number };
      discipline: { id: number };
      date: string;
      timeIn: string;
      timeOut: string;
    }[];
  }
  