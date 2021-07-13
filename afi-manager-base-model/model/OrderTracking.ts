import { BaseModel } from 'luong-base-model/lib';
import { HMTracking } from './HMTracking';
import { ProductHM } from './ProductHM';
import { UserHm } from './UserHm';

export class OrderTracking extends BaseModel {
  orderSource?: EOrderSource;

  orderId?: string;

  trackingId?: string;

  userId?: string;

  customerName?: string;

  desc?: string;

  infoHM?: HMTracking;

  status?: EStatusOrderTracking;

  lastTimeTracking?: Date;

  email?: string;

  productInfo?: ProductHM[];

  productLink?: string[];

  size?: string;

  productId?: string;

  price?: number;
  originPrice?: number;
  buyPrice?: number;

  userHM?: UserHm;
}
export enum EOrderSource {
  HM = 'H&M',
}

export enum EStatusOrderTracking {
  COMPLETED = 'Complete',
  FLOWING = 'Flowing',
}
