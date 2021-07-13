import puppeteer from "puppeteer";
import { orderTrackingController, userHmController } from "./controller";
import { UserHm } from "../afi-manager-base-model/model/UserHm";
import { OrderTracking } from "../afi-manager-base-model/model/OrderTracking";
const OrderAndPayment = async (
    params: OrderTracking[],
    browser: puppeteer.Browser
) => {
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();

    for (const order of params) {
        await page.goto("https://www2.hm.com/en_gb/logout");
        await page.goto("https://www2.hm.com/en_gb/login?logout=true");

        await page.setViewport({ width: 1920, height: 949 });
        try {
            await page.$eval("#onetrust-accept-btn-handler", (e) => {
                if (e) {
                    (e as any).click();
                }
            });
        } catch (error) {}
        await page.click("body");
        await page.waitForSelector("form #email");
        await page.click("form #email");
        await page.type("form #email", order.email);

        await page.waitForSelector("form #password");
        await page.click("form #password");
        await page.type("form #password", `Vanluong@123`);

        await page.waitForSelector(
            "#app > .Container-module--container__3vaRh > form > .CTA-module--action__3hGPH > span"
        );
        await page.click(
            "#app > .Container-module--container__3vaRh > form > .CTA-module--action__3hGPH > span"
        );

        await navigationPromise;

        try {
            await page.waitForSelector(
                ".UserMenu--userMenuWrapper__2TNHh:nth-child(2) > nav > .UserMenu-module--ul__FZ9hS > .UserMenu-module--li__jnU4m:nth-child(1) > .CTA-module--action__3hGPH"
            );
            await page.click(
                ".UserMenu--userMenuWrapper__2TNHh:nth-child(2) > nav > .UserMenu-module--ul__FZ9hS > .UserMenu-module--li__jnU4m:nth-child(1) > .CTA-module--action__3hGPH"
            );
        } catch (error) {
            // todo : send not
            break;
        }

        if (order.productId) {
            await page.goto(
                `https://www2.hm.com/en_gb/productpage.${order.productId}.html`
            );
        } else {
            console.log(`-------------error not productId---------`);
        }

        await navigationPromise;

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([89, 45, 323]);
            }, 4000);
        });

        //

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([89, 45, 323]);
            }, 6000);
        });
    }
};

autoPayment();
async function autoPayment() {
    userHmController.getOrderIsNotCreateFromTool().then(async (res) => {
        console.log(res);

        if (res.length > 0) {
            const browser = await puppeteer.launch({
                headless: false,
                devtools: true,
            });
            await OrderAndPayment([res[0]], browser);
        } else {
            console.log("Khong co order de tao");
        }
    });
}
