
import axios from 'axios'
import authAxios from './authenicationHook';

const  getLisitingData= (id)=>{
    
    return new Promise((resolve,reject)=>
{   let dataActiveLisiting;
    if(localStorage.user!==undefined)
    {
        authAxios.get("https://mhodsaifansari.pythonanywhere.com/api/view_list/"+id)
        .then((response)=>{
            dataActiveLisiting=response.data
            dataActiveLisiting.id=id;
            resolve(dataActiveLisiting);})
        .catch((err)=>{
            reject(err);
        })
    }else{
    axios.get("https://mhodsaifansari.pythonanywhere.com/api/view_list/"+id)
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