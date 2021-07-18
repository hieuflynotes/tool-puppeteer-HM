import { OrderTracking } from "../afi-manager-base-model/model/OrderTracking";
import puppeteer from "puppeteer";
import { userHmController } from "../controller";
import { UserHmController } from "../controller/UserHmController";
import { emailConfig, getBrowser } from ".";

const register = async (params: OrderTracking[]) => {
    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 949 });
    // page.setRequestInterception(true);
    // page.on('request', (req) => {
    //     if(req.resourceType() == 'image'){
    //     req.abort();
    //     }
    //     else {
    //     req.continue();
    //     }
    //     });
    const navigationPromise = page.waitForNavigation();
    const client = await page.target().createCDPSession();

    await client.send("Network.setCacheDisabled", {
        cacheDisabled: true,
    });
    await page.reload({ waitUntil: "networkidle2" });
    let indexNext = 1;
    for await (const order of params) {
        console.log(`resgister for  ---------`);
        console.log({
            id: order.id,
            email: order.email,
        });
        indexNext++;
        await page.goto("https://www2.hm.com/en_gb/logout");

        await page.goto("https://www2.hm.com/en_gb/register");
        try {
            await page.$eval("#onetrust-accept-btn-handler", (e) => {
                if (e) {
                    (e as any).click();
                }
            });
        } catch (error) {}

        await page.waitForSelector("form #email");
        page.evaluate(
            (params: { userName }) => {
                let node: any = document.getElementById("email");
                node.value = params.userName;
            },
            {
                userName: order.email,
            }
        );
        await page.focus("form #email");
        await page.type("form #email", " ");

        await page.waitForSelector("form #password");
        await page.click("form #password");
        await page.type("form #password", order.userHM.password); //todo : hard code

        await page.waitForSelector("form #dateOfBirth");
        await page.click("form #dateOfBirth");

        await page.type("#dateOfBirth", "11");

        await page.waitForSelector(
            'form > div:nth-child(3) > div.Field-module--childWrapper__Rpmaa > div > input[name="day"]'
        );
        await page.click(
            'form > div:nth-child(3) > div.Field-module--childWrapper__Rpmaa > div > input[name="day"]'
        );
        await page.type(
            'form > div:nth-child(3) > div.Field-module--childWrapper__Rpmaa > div > input[name="day"]',
            "11"
        );

        await page.waitForSelector(
            'form > div:nth-child(3) > div.Field-module--childWrapper__Rpmaa > div > input[name="month"]'
        );
        await page.click(
            'form > div:nth-child(3) > div.Field-module--childWrapper__Rpmaa > div > input[name="month"]'
        );
        await page.type(
            'form > div:nth-child(3) > div.Field-module--childWrapper__Rpmaa > div > input[name="month"]',
            "11"
        );

        //

        await page.waitForSelector(
            'form > div:nth-child(3) > div.Field-module--childWrapper__Rpmaa > div > input[name="year"]'
        );
        await page.click(
            'form > div:nth-child(3) > div.Field-module--childWrapper__Rpmaa > div > input[name="year"]'
        );
        await page.type(
            'form > div:nth-child(3) > div.Field-module--childWrapper__Rpmaa > div > input[name="year"]',
            "2001"
        );

        await page.waitForSelector(
            "form > div.Accordion-module--container__QC8bm > div > button"
        );
        await page.click(
            "form > div.Accordion-module--container__QC8bm > div > button"
        );

        await page.waitForSelector(
            ".RegisterForm--optionalFields__1NuGM #firstName"
        );
        await page.click(".RegisterForm--optionalFields__1NuGM #firstName");
        await page.type(
            ".RegisterForm--optionalFields__1NuGM #firstName",
            order.userHM.firstName
        );

        await page.waitForSelector(
            ".RegisterForm--optionalFields__1NuGM #lastName"
        );
        await page.click(".RegisterForm--optionalFields__1NuGM #lastName");
        await page.type(
            ".RegisterForm--optionalFields__1NuGM #lastName",
            order.userHM.lastName
        );

        await page.waitForSelector(
            ".RegisterForm--optionalFields__1NuGM #gender"
        );
        await page.click(".RegisterForm--optionalFields__1NuGM #gender");

        await page.select(
            ".RegisterForm--optionalFields__1NuGM #gender",
            "NOSAY"
        );

        await page.waitForSelector(
            ".RegisterForm--optionalFields__1NuGM #gender"
        );
        await page.click(".RegisterForm--optionalFields__1NuGM #gender");

        await page.waitForSelector(
            ".RegisterForm--optionalFields__1NuGM #postalCode"
        );
        await page.click(".RegisterForm--optionalFields__1NuGM #postalCode");
        await page.type(
            ".RegisterForm--optionalFields__1NuGM #postalCode",
            order.userHM.postcode
        );

        await page.waitForSelector("form #hmNewsSubscription");
        await page.click("form #hmNewsSubscription");

        await page.waitForSelector(
            "#app > .Container-module--container__3vaRh > form > .CTA-module--action__3hGPH > span"
        );
        await page.click(
            "#app > .Container-module--container__3vaRh > form > .CTA-module--action__3hGPH > span"
        );

        await navigationPromise;

        await page.waitForSelector(
            "#app > .Container-module--container__3vaRh > .ModalButtons-module--container__1ODer > .ModalButtons-module--buttonHolder__2D5GP > .CTA-module--secondary__3w4kI"
        );
        await page.click(
            "#app > .Container-module--container__3vaRh > .ModalButtons-module--container__1ODer > .ModalButtons-module--buttonHolder__2D5GP > .CTA-module--secondary__3w4kI"
        );
        const newOrder = await userHmController.updateOrder({
            ...order,
            isRegister: true,
        });
        console.log(newOrder);
        console.log("-----------------------------");
    }
    await browser.close();
};

autoCreateAccount();
async function autoCreateAccount() {
    userHmController
        .getOrderIsNotRegisterAccountFromTool({
            email: emailConfig,
        })
        .then((res) => {
            console.log(res);

            if (res.length > 0) {
                register(res);
            } else {
                console.log("Khong co account de tao");
            }
        });
}
