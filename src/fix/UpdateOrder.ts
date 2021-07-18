import { userHmController } from "../controller";

async function fix() {
    userHmController
        .updateOrder({
            id: "6a9febdf-7c54-4258-b881-5d21cbfec8a7",
            isRegister: false,
            email: "yulingg1512+130+afi9@gmail.com",
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}
fix();
