import puppeteer from "puppeteer";
import { orderTrackingController, userHmController } from "../controller";
import { UserHm } from "../afi-manager-base-model/model/UserHm";
export const loginAction = async (
    params: { username: string; password: string },
    page: puppeteer.Page
) => {
    // await page.deleteCookie();

    await page.goto("https://www2.hm.com/en_gb/logout");

    await page.goto("https://www2.hm.com/en_gb/login");

    try {
        await page.evaluate(() => {
            let e = document.querySelector("#onetrust-accept-btn-handler");
            sessionStorage.clear();
            localStorage.clear();
            document.cookie.split(";").forEach(function (c) {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(
                        /=.*/,
                        "=;expires=" + new Date().toUTCString() + ";path=/"
                    );
            });

            if (e) {
                (e as any).click();
            }
        });
    } catch (error) {}
    await page.waitForTimeout(200);

    await page.waitForSelector("form #email");
    page.evaluate(
        (params: { userName }) => {
            let node: any = document.getElementById("email");
            node.value = params.userName;
        },
        {
            userName: params.username,
        }
    );
    await page.focus("form #email");
    await page.type("form #email", " ");
    await page.waitForTimeout(500);

    await page.waitForSelector("form #password");
    await page.focus("form #password");
    await page.type("form #password", params.password);
    await page.waitForTimeout(500);
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
