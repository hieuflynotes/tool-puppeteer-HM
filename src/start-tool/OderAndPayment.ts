import puppeteer from "puppeteer";
import { orderTrackingController, userHmController } from "../controller";
import { UserHm } from "../afi-manager-base-model/model/UserHm";
import { OrderTracking } from "../afi-manager-base-model/model/OrderTracking";
import { loginAction } from "./LoginAction";
import { getBrowser } from ".";

const OrderAndPayment = async (
    params: OrderTracking[],
    browser: puppeteer.Browser
) => {
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();

    await page.setViewport({ width: 1920, height: 1080 });
    for (const order of params) {
        await navigationPromise;

        await loginAction(
            {
                username: order.email,
                password: "Vanluong@123",
            },
            page
        );

        for (const product of order.productOrder) {
            console.log({
                product,
            });

            if (product.productId) {
                await page.goto(
                    `https://www2.hm.com/en_gb/productpage.${product.productId}.html`
                );
            } else {
                console.log(`-------------error not productId---------`);
            }

            await page.waitForSelector("#picker-1 > button");
            await page.click("#picker-1 > button");

            await page.evaluate(() => {
                const getAllSpan = document.querySelectorAll(
                    "#picker-1 > ul > li > div > button > span"
                );
                getAllSpan.forEach((item) => {
                    item.setAttribute("size", item.textContent);
                });
            });

            await page.waitForSelector(
                "#picker-1 > ul > li > div > button > span"
            );
            await page.click(
                `#picker-1 > ul > li > div > button > span[size='${product.size}']`
            );

            await page.waitForSelector(
                "#main-content > div.product.parbase > div.layout.pdp-wrapper.product-detail.sticky-footer-wrapper.js-reviews > div.module.product-description.sticky-wrapper > div.sub-content.product-detail-info.product-detail-meta.inner.sticky-on-scroll.semi-sticky > div > div.product-item-buttons > div.product-button-wrapper > button"
            );
            await page.click(
                "#main-content > div.product.parbase > div.layout.pdp-wrapper.product-detail.sticky-footer-wrapper.js-reviews > div.module.product-description.sticky-wrapper > div.sub-content.product-detail-info.product-detail-meta.inner.sticky-on-scroll.semi-sticky > div > div.product-item-buttons > div.product-button-wrapper > button"
            );
            await page.waitForTimeout(1000);
        }

        await navigationPromise;

        page.goto("https://www2.hm.com/en_gb/cart");

        await page.waitForRequest("https://ct.pinterest.com/md/");

        await page.waitForTimeout(2000);

        let indexProductSelect = 0;
        for (const product of order.productOrder) {
            indexProductSelect++;
            await page.select(
                `#sidebar-sticky-boundary > section.CartItemsList--wrapper__2l3t1 > div > ul > li:nth-child(${indexProductSelect}) > article > div.Actions-module--actions__1S8Uk > div > div > div > select`,
                "1"
            );
        }

        await page.waitForSelector(
            "#sidebar-sticky-boundary > section.CartSidebar--wrapper__2D7xe.CartSidebar--reactCheckoutEnabledUpdatedSidebar__JyGkt > div > div > div.CartSidebar--sidebarContent__3nsmD.CartSidebar--isNotCompressedSidebar__1l9b2 > div.CartSidebar--continue__2L8c_ > button"
        );
        await page.click(
            `#sidebar-sticky-boundary > section.CartSidebar--wrapper__2D7xe.CartSidebar--reactCheckoutEnabledUpdatedSidebar__JyGkt > div > div > div.CartSidebar--sidebarContent__3nsmD.CartSidebar--isNotCompressedSidebar__1l9b2 > div.CartSidebar--continue__2L8c_ > button`
        );
        await page.waitForTimeout(2000);
        await page.goto("https://www2.hm.com/en_gb/checkout-r");
        await page.waitForSelector("#line1");
        await page.type("#line1", order.userHM.address);

        await page.waitForSelector("#line2");
        await page.type("#line2", order.userHM.address);

        await page.waitForSelector("#town");
        await page.type("#town", "London");

        await page.waitForSelector("#postalCode");
        await page.type("#postalCode", order.userHM.postcode);

        const newOrder = await userHmController.updateOrder({
            ...order,
            orderId: "1",
        });
        console.log(newOrder);
    }
    browser.close();
};

autoPayment();
async function autoPayment() {
    userHmController.getOrderIsNotCreateFromTool().then(async (res) => {
        console.log(res);

        if (res.length > 0) {
            await OrderAndPayment(res, await getBrowser());
        } else {
            console.log("Khong co order de tao");
        }
    });
}
