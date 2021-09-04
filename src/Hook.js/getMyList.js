
import authAxios from "./authenicationHook"
const getMyList=()=>{

    return new Promise((resolve,reject)=>{
        authAxios.get("http://mhodsaifansari.pythonanywhere.com/api/mylist")
        .then((data)=>{console.log(data.data);resolve(data.data)})
        .catch((err)=>{reject(err)})
    })        

}   
export default getMyList