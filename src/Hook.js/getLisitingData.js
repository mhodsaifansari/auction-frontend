
import axios from 'axios'
import authAxios from './authenicationHook';
import baseurl from "./url";
const  getLisitingData= (id)=>{
    
    return new Promise((resolve,reject)=>
{   let dataActiveLisiting;
    if(localStorage.user!==undefined)
    {
        authAxios.get(baseurl+"/api/view_list/"+id)
        .then((response)=>{
            dataActiveLisiting=response.data
            dataActiveLisiting.id=id;
            resolve(dataActiveLisiting);})
        .catch((err)=>{
            console.log(err.request.status)
            reject(err);
        })
    }else{
    axios.get(baseurl+"/api/view_list/"+id)
    .then((response)=>{
        dataActiveLisiting=response.data
        dataActiveLisiting.id=id;
        resolve(dataActiveLisiting);})
    .catch((err)=>{
        reject(err);
    })}
    //console.log(dataActiveLisiting[0]);
});

};

export default getLisitingData