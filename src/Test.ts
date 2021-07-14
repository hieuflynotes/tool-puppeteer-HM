// import { OrderTracking } from "./afi-manager-base-model/model/OrderTracking";
// import puppeteer from "puppeteer";
// import { userHmController } from "./controller";
// import { UserHmController } from "./controller/UserHmController";

// const register = async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//         executablePath: "/opt/google/chrome/google-chrome",
//         args: [
//             "--user-data-dir=/home/luongdeveloper/.config/google-chrome",
//             "--profile-directory=Profile 1",
//             "--no-sandbox",
//             "--disabled-setupid-sandbox",
//         ],
//     });
//     const page = await browser.newPage();
//     await page.goto("chrome://version");
//     await page.waitForTimeout(5000);
//     await page.close();
// };
import * as _ from "lodash";
const newData = [
    {
        productOrder: [
            {
                productId: "0922865001",
                size: "12-18M",
                price: 10,
                originPrice: 1,
                buyPrice: 5,
                quantity: 1,
            },
        ],
        userHMId: "c647c0fe-da9d-4b3e-b869-040e0f911336",
        customerName: "Thuy A BON  HP1129 DUYEN",
        email: "luutrangnhung2301hma+-afi1@gmail.com",
        isRegister: false,
        isOrder: false,
        errorDesc: null,
    },
    {
        productOrder: [
            {
                productId: "0932237005",
                size: "12-18M",
                price: 7,
                originPrice: 1,
                buyPrice: 2,
                quantity: 1,
            },
        ],
        userHMId: "c647c0fe-da9d-4b3e-b869-040e0f911336",
        customerName: "Thuy A BON  HP1129 DUYEN",
        email: "luutrangnhung2301hma+-afi2@gmail.com",
        isRegister: false,
        isOrder: false,
        errorDesc: null,
    },
    {
        productOrder: [
            {
                productId: "0932232006",
                size: "12-18M",
                price: 5,
                originPrice: 1,
                buyPrice: 2,
                quantity: 1,
            },
        ],
        userHMId: "c647c0fe-da9d-4b3e-b869-040e0f911336",
        customerName: "Thuy A BON  HP1129 DUYEN",
        email: "luutrangnhung2301hma+-afi3@gmail.com",
        isRegister: false,
        isOrder: false,
        errorDesc: null,
    },
    {
        productOrder: [
            {
                productId: "0930219005",
                size: "2-4Y",
                price: 3.99,
                originPrice: 3.99,
                buyPrice: -1,
                quantity: 1,
            },
        ],
        userHMId: "c647c0fe-da9d-4b3e-b869-040e0f911336",
        customerName: "Thuy A BON  HP1129 DUYEN",
        email: "luutrangnhung2301hma+-afi4@gmail.com",
        isRegister: false,
        isOrder: false,
        errorDesc: null,
    },
    {
        productOrder: [
            {
                productId: "0930219005",
                size: "2-4Y",
                price: 3.99,
                originPrice: 3.99,
                buyPrice: -1,
                quantity: 1,
            },
        ],
        userHMId: "c647c0fe-da9d-4b3e-b869-040e0f911336",
        customerName: "Thuy A BON  HP1129 DUYEN",
        email: "luutrangnhung2301hma+-afi5@gmail.com",
        isRegister: false,
        isOrder: false,
        errorDesc: null,
    },
    {
        productOrder: [
            {
                productId: "0982604001",
                size: "2-3Y",
                price: 9.99,
                originPrice: 9.99,
                buyPrice: 4,
                quantity: 1,
            },
        ],
        userHMId: "c647c0fe-da9d-4b3e-b869-040e0f911336",
        customerName: "Thuy A BON  HP1129 DUYEN",
        email: "luutrangnhung2301hma+-afi6@gmail.com",
        isRegister: false,
        isOrder: false,
        errorDesc: null,
    },
    {
        productOrder: [
            {
                productId: "0930219005",
                size: "1-2Y",
                price: 3.99,
                originPrice: 3.99,
                buyPrice: -1,
                quantity: 1,
            },
        ],
        userHMId: "c647c0fe-da9d-4b3e-b869-040e0f911336",
        customerName: "Thuy A BON  HP1129 DUYEN",
        email: "luutrangnhung2301hma+-afi7@gmail.com",
        isRegister: false,
        isOrder: false,
        errorDesc: null,
    },
    {
        productOrder: [
            {
                productId: "0561307049",
                size: "10-12Y",
                price: 9.99,
                originPrice: 9.99,
                buyPrice: 4,
                quantity: 1,
            },
        ],
        userHMId: "c647c0fe-da9d-4b3e-b869-040e0f911336",
        customerName: "Thuy A BON  HP1129 DUYEN",
        email: "luutrangnhung2301hma+-afi8@gmail.com",
        isRegister: false,
        isOrder: false,
        errorDesc: null,
    },
    {
        productOrder: [
            {
                productId: "0701985004",
                size: "10-12Y",
                price: 8.99,
                originPrice: 8.99,
                buyPrice: 4,
                quantity: 1,
            },
        ],
        userHMId: "c647c0fe-da9d-4b3e-b869-040e0f911336",
        customerName: "Thuy A BON  HP1129 DUYEN",
        email: "luutrangnhung2301hma+-afi9@gmail.com",
        isRegister: false,
        isOrder: false,
        errorDesc: null,
    },
    // {
    //     productOrder: [
    //         {
    //             productId: "0930219002",
    //             size: "2-4Y",
    //             price: 3.99,
    //             originPrice: 3.99,
    //             buyPrice: -1,
    //             quantity: 1,
    //         },
    //     ],
    //     userHMId: "c647c0fe-da9d-4b3e-b869-040e0f911336",
    //     customerName: "Thuy A BON  HP1129 DUYEN",
    //     email: "luutrangnhung2301hma+-afi4@gmail.com",
    //     isRegister: false,
    //     isOrder: false,
    //     errorDesc: null,
    // },
];
