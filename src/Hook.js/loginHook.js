import axios  from "axios";
import baseurl from "./url";

const loginHook=(username,password)=>{

    return new Promise( (resolve,reject)=>{
        axios.post(baseurl+"/api/login",{
        'username':username,
        'password':password})
    .then((response)=>{resolve(response.data)})
    .catch((err)=>{reject(err);})

    });


}
export default loginHook