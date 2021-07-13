import { BaseModel } from 'luong-base-model';

export class MetaData<T = any> extends BaseModel {
  key?: string;

  data?: T;

  userId?: string;
}
