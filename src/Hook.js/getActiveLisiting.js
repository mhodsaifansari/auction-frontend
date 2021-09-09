import axios from 'axios'
import baseurl from "./url";
const  getActiveLisiting= (page)=>new Promise((resolve,reject)=>
{   let dataActiveLisiting;
    console.log("calling index");
    axios.get(baseurl+"/api/index?page="+page)
    .then((response)=>{
        dataActiveLisiting=response.data
        resolve(dataActiveLisiting);})
    .catch((err)=>{
        reject(err);
    })
    //console.log(dataActiveLisiting[0]);
});

export default getActiveLisiting