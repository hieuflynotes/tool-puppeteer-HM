import { OrderTracking } from '../model/OrderTracking';
import { IBaseController } from 'luong-base-model';
export interface IOrderTrackingController
  extends IBaseController<OrderTracking> {
  createManyFlow(params: PropsCreateManyFlow): Promise<OrderTracking[]>;

  createManyByEmailsAndOrders(
    params: PropsCreateManyFlow,
  ): Promise<OrderTracking[]>;

  syncSortTracking(params: {}): Promise<OrderTracking[]>;
}

export interface PropsCreateManyFlow {
  orderIds: string[];
  customerName: string;
  email: string;
  orderId: string;
  link: string;
  links?: string[];
  emails?: string[];
  customerNames?: string[];
}
