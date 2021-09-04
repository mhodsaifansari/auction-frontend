import axios from 'axios'

const  getActiveLisiting= new Promise((resolve,reject)=>
{   let dataActiveLisiting;
    console.log("calling index");
    axios.get("http://mhodsaifansari.pythonanywhere.com/api/index")
    .then((response)=>{
        dataActiveLisiting=response.data
        resolve(dataActiveLisiting);})
    .catch((err)=>{
        reject(err);
    })
    //console.log(dataActiveLisiting[0]);
});

export default getActiveLisiting