import { userHmController } from "src/controller";

async function fix() {
    userHmController.updateOrder({
        id : "",
        isOrder: false,
    }).then(res=>{
        console.log(res);  
    }).catch(err=>{
        console.log(err);
        
    })
}
fix()