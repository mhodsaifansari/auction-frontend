import axios from "axios"

const getCaterogry =(group_of)=>{
 return   new Promise ((resolve,reject)=>{
        axios.get("https://mhodsaifansari.pythonanywhere.com/api/cateogry/"+group_of)
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