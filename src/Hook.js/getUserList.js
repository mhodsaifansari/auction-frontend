import axios from "axios"
import authAxios from "./authenicationHook"
import baseurl from "./url";
const getUserList=(username,page)=>{
    return new Promise ((resolve,reject)=>{
        authAxios.get(baseurl+"/api/user/"+username+"?page="+page)
        .then((response)=>{resolve(response.data);})
        .catch((err)=>{reject(err);})
    })

};

export default getUserList
