// Exemplo de interfaces básicas para entidades relacionadas
export interface IUser {
    id: number;
    name: string
    // Outras propriedades do usuário
  }
  
  export interface ITeacher extends IUser {
    // Propriedades específicas do teacher
    teacherConsents?: ITeacherConsent[];
  }
  
  export interface ICoordinator extends IUser {
    // Propriedades específicas do coordinator
    coordinatorConsents?: ICoordinatorConsent[];
  }
  
  export interface IDirector extends IUser {
    // Propriedades específicas do director
    directorConsents?: IDirectorConsent[];
  }
  
  export interface IDiscipline {
    id: number;
    name: string;
    // Outras propriedades de Discipline
  }
  
  // Enum de status da requisição
  export enum RequestStatusEnum {
    DRAFT = 'Rascunho',
    IN_PROGRESS = 'Em andamento',
    PENDINGC = 'Em análise (Coordenação)',
    PENDINGD = 'Em análise (Direção)',
    APPROVED = 'Aprovado',
    REJECTED = 'Rejeitado',
  }
  
  // Interface da entidade Request
  export interface IRequest {
    id: number;
    user: IUser;
    companions: IUser[];
    status: RequestStatusEnum;
    statusRequests?: IStatusRequest[];
    subjects: ISubject[];
    locations: ILocation[];
    itinerary: IItineraryItem[];
    resources: IResource[];
    consent: ITeacherConsentDiscipline[];
    coordinatorConsents?: ICoordinatorConsent[];
    directorConsents?: IDirectorConsent[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Interface da entidade StatusRequest
  export interface IStatusRequest {
    id: number;
    request: IRequest;
    user: IUser;
    name: string;
    comment?: string;
    status: RequestStatusEnum;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Interface da entidade Subject
  export interface ISubject {
    id: number;
    subject: IDiscipline;
    classGroup: string;
    studentCount: number;
    workload: number;
    fileData: string;
    fileName: string;
    fileType: string;
    request: IRequest;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Interface da entidade Location
  export interface ILocation {
    id: number;
    location: string;
    municipality: string;
    periodStart: Date;
    periodEnd: Date;
    totalDistanceKm: number;
    request: IRequest;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Interface da entidade ItineraryItem
  export interface IItineraryItem {
    id: number;
    date: Date;
    origin: string;
    destination: string;
    activity: string;
    departureTime: Date;
    arrivalTime: Date;
    unpavedRoadKm: number;
    kilometers: number;
    roadCondition: "Boa" | "Regular" | "Ruim";
    hasWoodenBridge: boolean;
    hasFerry: boolean;
    hasToll: boolean;
    request: IRequest;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Interface da entidade Resource
  export interface IResource {
    id: number;
    resource: string;
    quantity: number;
    quantityPerDay: number;
    request: IRequest;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Interface da entidade TeacherConsentDiscipline
  export interface ITeacherConsentDiscipline {
    id: number;
    teacher: ITeacher;
    discipline: IDiscipline;
    date: Date;
    timeIn: string;
    timeOut: string;
    signature: ITeacherConsent;
    request: IRequest;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Interfaces para os consentimentos
  export interface IConsent {
    id: number;
    accepted: boolean;
    signature: string;
    opinion?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ITeacherConsent extends IConsent {
    userTeacher: ITeacher;
    request: IRequest;
  }
  
  export interface ICoordinatorConsent extends IConsent {
    userCoordinator: ICoordinator;
    request: IRequest;
  }
  
  export interface IDirectorConsent extends IConsent {
    userDirector: IDirector;
    request: IRequest;
  }
  