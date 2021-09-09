
import authAxios from "./authenicationHook"
import baseurl from "./url";
const getMyList=(page)=>{

    return new Promise((resolve,reject)=>{
        authAxios.get(baseurl+"/api/mylist?page="+page)
        .then((data)=>{console.log(data.data);resolve(data.data)})
        .catch((err)=>{reject(err)})
    })        

}   
export default getMyList