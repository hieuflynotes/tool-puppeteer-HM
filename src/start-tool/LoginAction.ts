import puppeteer from "puppeteer";
import { orderTrackingController, userHmController } from "../controller";
import { UserHm } from "../afi-manager-base-model/model/UserHm";
export const loginAction = async (
    params: { username: string; password: string },
    page: puppeteer.Page
) => {
    await page.deleteCookie();

    try {
        await page.$eval("#onetrust-accept-btn-handler", (e) => {
            if (e) {
                (e as any).click();
            }
        });
    } catch (error) {}
    await page.goto("https://www2.hm.com/en_gb/logout");

    await page.waitForSelector("form #email");
    await page.click("form #email");
    await page.type("form #email", params.username);

    await page.waitForSelector("form #password");
    await page.click("form #password");
    await page.type("form #password", params.password);

    await page.waitForSelector(
        "#app > .Container-module--container__3vaRh > form > .CTA-module--action__3hGPH > span"
    );
    await page.click(
        "#app > .Container-module--container__3vaRh > form > .CTA-module--action__3hGPH > span"
    );

    await page.waitForNavigation();

    try {
        await page.waitForSelector(
            ".UserMenu--userMenuWrapper__2TNHh:nth-child(2) > nav > .UserMenu-module--ul__FZ9hS > .UserMenu-module--li__jnU4m:nth-child(1) > .CTA-module--action__3hGPH"
        );
        await page.click(
            ".UserMenu--userMenuWrapper__2TNHh:nth-child(2) > nav > .UserMenu-module--ul__FZ9hS > .UserMenu-module--li__jnU4m:nth-child(1) > .CTA-module--action__3hGPH"
        );
    } catch (error) {}
    return Promise.resolve({});
};