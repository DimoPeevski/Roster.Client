import { Employee } from './employee';

export interface User {
  id: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  registrationDate: Date;
  lastLoginDate: Date;
  isActive: boolean;
  createdByUserId?: string;
  profilePictureUrl: string;
  createdEmployees?: Employee[];
}

export interface UserForAuth {
  id: string;
  email: string;
  password: string;
}
