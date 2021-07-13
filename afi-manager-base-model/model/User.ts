import { BaseModel } from 'luong-base-model/lib';

export class User extends BaseModel {
  fullName?: string;

  accountId?: string;

  phoneNumber?: string;

  email?: string;

  description?: string;
}

export class UserAccount extends User {
  username?: string;
  password?: string;
}
