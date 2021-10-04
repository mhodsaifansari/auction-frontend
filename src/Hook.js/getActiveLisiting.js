import axios from 'axios'
import authAxios from './authenicationHook';
import baseurl from "./url";
const  getActiveLisiting= (page,isLogged)=>new Promise((resolve,reject)=>
{   let dataActiveLisiting;
    console.log("calling index");
    if(isLogged==true){
    authAxios.get(baseurl+"/api/index?page="+page)
    .then((response)=>{
        dataActiveLisiting=response.data
        resolve(dataActiveLisiting);})
    .catch((err)=>{
        reject(err);
        
    })}
    else
    {
        axios.get(baseurl+"/api/index?page="+page)
        .then((response)=>{
            dataActiveLisiting=response.data
            resolve(dataActiveLisiting);})
        .catch((err)=>{
            reject(err);
            
        }) 
    }
    //console.log(dataActiveLisiting[0]);
});

export default getActiveLisiting