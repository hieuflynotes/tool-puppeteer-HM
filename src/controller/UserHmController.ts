import { OrderTracking } from "../afi-manager-base-model/model/OrderTracking";
import { UserHm } from "../afi-manager-base-model/model/UserHm";
import { BaseController } from "./BaseController";

export class UserHmController extends BaseController<UserHm> {
    getOrderIsNotRegisterAccountFromTool(): Promise<OrderTracking[]> {
        return this.client
            .get(
                `${this.serviceURL}/${this.basePath}/get-order-is-not-register-from-tool`
            )
            .then((res) => {
                return res.data;
            });
    }

    getOrderIsNotCreateFromTool(): Promise<OrderTracking[]> {
        return this.client
            .get(
                `${this.serviceURL}/${this.basePath}/get-order-is-not-create-from-tool`
            )
            .then((res) => {
                return res.data;
            });
    }

    updateOrder(params: OrderTracking): Promise<OrderTracking> {
        return this.client
            .post(`${this.serviceURL}/${this.basePath}/update-order`, params)
            .then((res) => {
                return res.data;
            });
    }
}
