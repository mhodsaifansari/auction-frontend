import axios from "axios";
import baseurl from "./url";
const authAxios=axios.create();
authAxios.interceptors.request.use(
     async function(config){
        
        
        try{
       //eslint-disable-next-line         
       let response=await axios.post(baseurl+"/verify",{
            'token':JSON.parse(localStorage.user).access
        });
        config.headers.Authorization= `Bearer ${JSON.parse(localStorage.user).access}`;
        return config;
        }
        catch(err)
        {
            let new_access= await axios.post(baseurl+"/refresh",{
                'refresh':JSON.parse(localStorage.user).refresh
            });
            const access= await new_access.data.access
            let t=JSON.parse(localStorage.user);
                t.access=await access;
            localStorage.setItem('user',JSON.stringify(t));
            config.headers.Authorization= `Bearer ${JSON.parse(localStorage.user).access}`;
            return config;
        }
    },error=>{
        return Promise.reject(error);
    }
)


export default authAxios