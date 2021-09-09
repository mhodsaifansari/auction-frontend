import axios from "axios"
import baseurl from "./url";
const getCaterogry =(group_of,page)=>{
 return   new Promise ((resolve,reject)=>{
        axios.get(baseurl+"/api/cateogry/"+group_of+"?page="+page)
        .then((response)=>{
            console.log(response.data);
            resolve(response.data);
        })
        .catch((err)=>{
            reject(err);
        })

 })
}
export default getCaterogry;