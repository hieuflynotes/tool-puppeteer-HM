import { userHmController } from "../controller/index";

async function fix() {
    userHmController.updateOrder({
        id : "823d43dd-641d-44f4-b61c-d350625872b6",
        isOrder: true,
    }).then(res=>{
        console.log(res);  
    }).catch(err=>{
        console.log(err);
        
    })
}
fix()