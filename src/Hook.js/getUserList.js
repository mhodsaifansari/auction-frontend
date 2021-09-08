import axios from "axios"
import authAxios from "./authenicationHook"
const getUserList=(username)=>{
    return new Promise ((resolve,reject)=>{
        authAxios.get("https://mhodsaifansari.pythonanywhere.com/api/user/"+username)
        .then((response)=>{resolve(response.data);})
        .catch((err)=>{reject(err);})
    })

};

export default getUserList
