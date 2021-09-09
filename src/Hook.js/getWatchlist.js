import authAxios from "./authenicationHook";
import baseurl from "./url";

const getWatchlist=(page)=>{
    return new Promise ((resolve,reject)=>{
        authAxios.get(baseurl+"/api/watchlist?page="+page)
        .then((data)=>{ console.log(data.data);resolve(data.data)})
        .catch((err)=>{reject(err);});
    })
}

export default getWatchlist
