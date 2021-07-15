import puppeteer from "puppeteer";

export async function getBrowser() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: "/opt/google/chrome/google-chrome",
        // devtools: true,
        defaultViewport: {
            height: 1080,
            width: 1920,
        },
    });
    return browser;
}

export const emailConfig = "Lannguyen220419+20@gmail.com";
