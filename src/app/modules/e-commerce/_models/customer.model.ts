import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Customer extends BaseModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  placeOfBirth:  string;
  yearOfBirth: string;
  nationalCode: string;
  isActive: boolean;
  confirmationStatus:  string;
  dateCreated:string;
  imageUrl:string;
  username: string;
  status:number;
}
