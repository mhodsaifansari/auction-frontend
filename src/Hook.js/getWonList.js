import authAxios from "./authenicationHook";
const getWonList=()=>{
    return new Promise((resolve,reject)=>{
        authAxios.get("http://mhodsaifansari.pythonanywhere.com/api/wonlist")
        .then((data)=>{console.log(data.data);resolve(data.data)})
        .catch((err)=>{reject(err)})
    })
}
export default getWonList;