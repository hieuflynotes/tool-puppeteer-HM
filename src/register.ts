import { OrderTracking } from "./afi-manager-base-model/model/OrderTracking";
import puppeteer from "puppeteer";
import { userHmController } from "./controller";
import { UserHmController } from "./controller/UserHmController";

const register = async (params: OrderTracking[]) => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();

    const navigationPromise = page.waitForNavigation();
    let indexNext = 1;
    const text = Math.random().toString(36).slice(-4);
    for await (const order of params) {
        indexNext++;
        order.email = `${text}afi${indexNext}${order.userHM.username}`;
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
        await page.click("form #email");
        await page.type("form #email", order.email);

        await page.waitForSelector("form #password");
        await page.click("form #password");
        await page.type("form #password", "Vanluong@123"); //todo : hard code

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

        console.log("74");

        await page.waitForSelector(
            "form > div.Accordion-module--container__QC8bm > div > button"
        );
        await page.click(
            "form > div.Accordion-module--container__QC8bm > div > button"
        );

        console.log("79");

        await page.waitForSelector(
            ".RegisterForm--optionalFields__1NuGM #firstName"
        );
        console.log("85");
        await page.click(".RegisterForm--optionalFields__1NuGM #firstName");
        await page.type(
            ".RegisterForm--optionalFields__1NuGM #firstName",
            order.userHM.firstName
        );

        console.log("92");

        await page.waitForSelector(
            ".RegisterForm--optionalFields__1NuGM #lastName"
        );
        console.log("97");
        await page.click(".RegisterForm--optionalFields__1NuGM #lastName");
        await page.type(
            ".RegisterForm--optionalFields__1NuGM #lastName",
            order.userHM.lastName
        );

        console.log("98");

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

        console.log("116");
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
        const newOrder = await userHmController.updateOrder(order);
        console.log(newOrder);
        console.log("-----------------------------");
    }
    // await page.close();
};

// register({
//   address: "21 Luong The Vinh",
//   firstName: 'Luong',
//   lastName: 'Nguyen',
//   password: 'Vanluong@123',
//   phone: '+447438233862',
//   note: 'orderauthentic.9x+00492@gmail.com',
//   postcode: 'N99LN',
//   town: 'London',
//   username : 'Nguyenngockhanhan2019@gmail.com'
// })

autoCreateAccount();
async function autoCreateAccount() {
    userHmController.getOrderIsNotRegisterAccountFromTool().then((res) => {
        console.log(res);

        if (res.length > 0) {
            register(res);
        } else {
            console.log("Khong co account de tao");
        }
    });
}
