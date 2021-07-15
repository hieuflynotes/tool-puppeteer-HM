import puppeteer from "puppeteer";

export async function getBrowser() {
    const browser = await puppeteer.launch({
        headless: false,
        // devtools: true,
        defaultViewport: {
            height: 1080,
            width: 1920,
        },
    });
    return browser;
}

export const emailConfig = "tuonghoa2771994+29@gmail.com";
