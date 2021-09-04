import authAxios from "./authenicationHook";
const getWonList=()=>{
    return new Promise((resolve,reject)=>{
        authAxios.get("https://mhodsaifansari.pythonanywhere.com/api/wonlist")
        .then((data)=>{console.log(data.data);resolve(data.data)})
        .catch((err)=>{reject(err)})
    })
}
export default getWonList;