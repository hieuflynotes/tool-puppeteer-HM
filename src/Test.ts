import puppeteer from "puppeteer";
import { userHmController } from "./controller";

interface UserHM {
    username?: string;

    password?: string;

    firstName?: string;

    lastName?: string;

    phone?: string;

    address?: string;

    town?: string;

    postcode?: string;

    note?: string;
}

const data = [
    {
        "code": "0953501001",
        "size": "7.5",
        "price": 4,
        "originPrice": 1,
        "buyPrice": 1,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "1½-2Y",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "1½-2Y",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "1½-2Y",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "1½-2Y",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "1½-2Y",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "1½-2Y",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "1½-2Y",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "9-12M",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "9-12M",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "9-12M",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "2-3Y",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "2-3Y",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "3-4Y",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "3-4Y",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "3-4Y",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "12-18M",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "12-18M",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0922865001",
        "size": "6-9M",
        "price": 10,
        "originPrice": 1,
        "buyPrice": 5,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0924006001",
        "size": "9-12M",
        "price": 4,
        "originPrice": 1,
        "buyPrice": 1,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0924006001",
        "size": "9-12M",
        "price": 4,
        "originPrice": 1,
        "buyPrice": 1,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0924006001",
        "size": "1½-2Y",
        "price": 4,
        "originPrice": 1,
        "buyPrice": 1,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0924006001",
        "size": "1½-2Y",
        "price": 4,
        "originPrice": 1,
        "buyPrice": 1,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0924006001",
        "size": "12-18M",
        "price": 4,
        "originPrice": 1,
        "buyPrice": 1,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0924006001",
        "size": "12-18M",
        "price": 4,
        "originPrice": 1,
        "buyPrice": 1,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0807908013",
        "size": "5.5",
        "price": 7.99,
        "originPrice": 7.99,
        "buyPrice": 3,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0930463015",
        "size": "1½-2Y",
        "price": 3.99,
        "originPrice": 3.99,
        "buyPrice": -1,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0930463002",
        "size": "1½-2Y",
        "price": 3.99,
        "originPrice": 3.99,
        "buyPrice": -1,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0932154007",
        "size": "9-12M",
        "price": 4,
        "originPrice": 1,
        "buyPrice": 1,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0685816001",
        "size": "M",
        "price": 3.99,
        "originPrice": 3.99,
        "buyPrice": -1,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0943495004",
        "size": "1½-2Y",
        "price": 8,
        "originPrice": 1,
        "buyPrice": 3,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0751534002",
        "size": "4",
        "price": 7,
        "originPrice": 1,
        "buyPrice": 2,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0975450002",
        "size": "4<span class=\"CartItemsList--fewPiecesLeft__3k_jr\"></span>",
        "price": 8,
        "originPrice": 1,
        "buyPrice": 3,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0894462002",
        "size": "34",
        "price": 16,
        "originPrice": 1,
        "buyPrice": 9,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0972640008",
        "size": "XL<span class=\"CartItemsList--fewPiecesLeft__3k_jr\"></span>",
        "price": 12.99,
        "originPrice": 12.99,
        "buyPrice": 7,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0969354003",
        "size": "S",
        "price": 8,
        "originPrice": 1,
        "buyPrice": 3,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0993597001",
        "size": "XS/S",
        "price": 12,
        "originPrice": 1,
        "buyPrice": 6,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    },
    {
        "code": "0953501001",
        "size": "3.5-4.5",
        "price": 4,
        "originPrice": 1,
        "buyPrice": 1,
        "userId": "d8c91ed3-2b9f-44b9-8adb-cf52dc0805e6"
    }
]