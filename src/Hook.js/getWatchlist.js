import authAxios from "./authenicationHook";

const getWatchlist=()=>{
    return new Promise ((resolve,reject)=>{
        authAxios.get("http://mhodsaifansari.pythonanywhere.com/api/watchlist")
        .then((data)=>{ console.log(data.data);resolve(data.data)})
        .catch((err)=>{reject(err);});
    })
}

export default getWatchlist
