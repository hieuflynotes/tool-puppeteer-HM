import axios, { AxiosError } from "axios";
import { OrderTrackingController } from "./OrderTrackingController";
import { UserHmController } from "./UserHmController";

export const appClient = axios.create({
    baseURL: "userHmController",
    timeout: 10000,
    headers: {
        common: {
            "Content-Type": "application/json",
        },
    },
});

export const userHmController = new UserHmController(
    "http://localhost:3008",
    "afi/userHm",
    appClient
);

export const orderTrackingController = new OrderTrackingController(
    "http://localhost:3008",
    "orderTracking",
    appClient
);
//
//
