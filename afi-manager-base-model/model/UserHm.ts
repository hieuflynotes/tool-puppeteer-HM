import { BaseModel } from 'luong-base-model';

export class UserHm extends BaseModel {
  username?: string;

  password?: string;

  firstName?: string;

  lastName?: string;

  phone?: string;

  address?: string;

  town?: string;

  postcode?: string;

  note?: string;

  isDone ?: boolean
}
