import { BaseController } from "./BaseController";
import { OrderTracking } from "../../afi-manager-base-model/model/OrderTracking";
import axios from "axios";
export class OrderTrackingController extends BaseController<OrderTracking> {
    autoCreateOrderFromTool(params: any): Promise<OrderTracking[]> {
        return this.client
            .post(
                `${this.serviceURL}/${this.basePath}/auto-create-order-from-tool`,
                params
            )
            .then((res) => {
                return res.data;
            });
    }
}
