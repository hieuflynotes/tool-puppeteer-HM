import puppeteer from "puppeteer";
import { orderTrackingController, userHmController } from "../controller";
import { UserHm } from "../afi-manager-base-model/model/UserHm";
import { loginAction } from "./LoginAction";
import { getBrowser } from ".";
const loginAndGetCart = async (
    params: UserHm[],
    browser: puppeteer.Browser
) => {
    return (async () => {
        const page = await browser.newPage();
        const navigationPromise = page.waitForNavigation();
        await page.setViewport({ width: 1920, height: 949 });

        for (const user of params) {
            await loginAction(
                {
                    password: user.password,
                    username: user.username,
                },
                page
            );

            await navigationPromise;

            await page.goto("https://www2.hm.com/en_gb/cart");
            await navigationPromise;

            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([89, 45, 323]);
                }, 4000);
            });
            const infoUser: UserHm = user;
            console.log(
                "🚀 ~ file: loginAndGetCart.ts ~ line 79 ~ return ~ infoUser",
                infoUser
            );

            await page.evaluate(
                (params: { infoUser; orderTrackingController }) => {
                    if (
                        document.querySelector(
                            "#sidebar-sticky-boundary > div > div > h2"
                        )
                    ) {
                        return;
                    }
                    const e = document.querySelector(
                        ".CartItemsList--list__2ECvP"
                    );
                    let getElementByXpath = (path): Element => {
                        return document.evaluate(
                            path,
                            document,
                            null,
                            XPathResult.FIRST_ORDERED_NODE_TYPE,
                            null
                        ).singleNodeValue as any;
                    };
                    let nodePriceToNumber = (nodePrice) => {
                        let price = nodePrice
                            ? Number(
                                  `${nodePrice.innerText}`.substring(
                                      1,
                                      nodePrice.innerText.length
                                  )
                              )
                            : 1;
                        return price;
                    };

                    const listItem = e.querySelectorAll(":scope > li");
                    let cart = [];
                    console.log(listItem);
                    listItem.forEach((item, i) => {
                        let nodeSize = getElementByXpath(
                            `//div[@id='sidebar-sticky-boundary']/section[1]/div/ul/li[${
                                i + 1
                            }]/article/div[1]/ul/li[3]/span[2]`
                        );
                        let nodeCode = getElementByXpath(
                            `//div[@id='sidebar-sticky-boundary']/section[1]/div/ul/li[${
                                i + 1
                            }]/article/div[1]/ul/li[1]/span[2]`
                        );
                        let nodeSalePrice = getElementByXpath(
                            `//div[@id='sidebar-sticky-boundary']/section[1]/div/ul/li[${
                                i + 1
                            }]/article/div[1]/div[2]/span[1]`
                        );

                        let nodeOriginPrice = getElementByXpath(
                            `//div[@id='sidebar-sticky-boundary']/section[1]/div/ul/li[${
                                i + 1
                            }]/article/div[1]/span`
                        );

                        let nodeTotalPrice = getElementByXpath(
                            `//div[@id='sidebar-sticky-boundary']/section[1]/div/ul/li[${
                                i + 1
                            }]/article/div[1]/ul/li[4]/span[2]`
                        );

                        let code = nodeCode ? nodeCode.innerHTML : "";
                        let size = nodeSize
                            ? nodeSize.innerHTML.replace("Few pieces left", "")
                            : "";
                        const indexOfSpan = size.indexOf("<");
                        if (indexOfSpan > 0) {
                            size = size.substring(0, indexOfSpan);
                        }

                        let originPrice = nodePriceToNumber(nodeOriginPrice);
                        let price = nodeSalePrice
                            ? nodePriceToNumber(nodeSalePrice)
                            : originPrice;

                        let totalPrice = nodePriceToNumber(nodeTotalPrice);
                        let quantity = Math.round(totalPrice / price);
                        let realPrice = price || originPrice;
                        let buyPrice =
                            realPrice > 5
                                ? Math.round(realPrice - 3 - 0.25 * realPrice)
                                : realPrice >= 4
                                ? realPrice - 3
                                : -1;
                        console.log({ code, quantity });

                        for (let i = 0; i < quantity; i++) {
                            if (code) {
                                cart.push({
                                    productOrder: [
                                        {
                                            productId: code,
                                            size,
                                            price: price || originPrice,
                                            originPrice,
                                            buyPrice,
                                        },
                                    ],
                                    userHMId: params?.infoUser.id,
                                });
                            }
                        }
                        console.log({
                            cart,
                        });
                    });
                    // todo : edit here
                    try {
                        fetch(
                            "http://localhost:3008/afi/userHm/auto-create-order-from-tool",
                            {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    data: cart,
                                }),
                            }
                        ).then((rawResponse) => {
                            console.log(rawResponse.json);
                        });
                    } catch (error) {
                        console.log({
                            error: "Looix reques",
                        });
                    }
                    console.log({
                        cart,
                    });
                },
                {
                    infoUser: infoUser,
                    orderTrackingController: orderTrackingController,
                } as any
            );
            //

            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([89, 45, 323]);
                }, 6000);
            });
        }
        await browser.close();
    })();
};

autoCreateAccount();
async function autoCreateAccount() {
    userHmController
        .find({
            filter: {
                isDone: false,
            },
        })
        .then(async (res) => {
            console.log(res);
            if (res.length > 0) {
                await loginAndGetCart(res, await getBrowser());
            } else {
                console.log("Account need get empty");
            }
        });
}
