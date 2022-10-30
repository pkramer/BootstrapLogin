import { Account } from './account.model';
export interface Student{
  id: string;
  name: string;
  dateOfBirth: Date;
  address: string;

  accounts?: Account[];
}