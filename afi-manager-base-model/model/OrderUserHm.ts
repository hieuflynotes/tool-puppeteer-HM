import { BaseModel } from 'luong-base-model';

export class OrderUserHm extends BaseModel {
  linkProduct?: string;

  size?: string;

  productId?: string;

  username?: string;

  orderId?: string;

  password?: string;

  userHmId?: string;
}
